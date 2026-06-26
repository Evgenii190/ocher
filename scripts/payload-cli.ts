/**
 * Payload CLI через Bun (обходит ERR_MODULE_NOT_FOUND на Windows при `payload` + tsx).
 * Usage: bun scripts/payload-cli.ts <command> [args...]
 */
import path from "node:path";
import { pathToFileURL } from "node:url";
import configImport from "@payload-config";
import { generateTypes } from "payload/node";

async function resolveConfig() {
  let config = configImport as unknown;
  if (
    config &&
    typeof config === "object" &&
    "default" in config &&
    (config as { default: unknown }).default
  ) {
    config = (config as { default: unknown }).default;
  }
  if (config instanceof Promise) {
    config = await config;
  }
  return config;
}

const argv = process.argv.slice(2);
const command = argv[0] ?? "";

async function main() {
  const config = await resolveConfig();

  if (command === "generate:types") {
    await generateTypes(config as Parameters<typeof generateTypes>[0]);
    return;
  }

  if (command.startsWith("migrate")) {
    const migrateModule = await import(
      pathToFileURL(
        path.join(process.cwd(), "node_modules/payload/dist/bin/migrate.js"),
      ).href
    );
    await migrateModule.migrate({
      config: config as Parameters<typeof migrateModule.migrate>[0]["config"],
      parsedArgs: { _: argv },
    });
    return;
  }

  console.error(`Unknown command: ${command || "(empty)"}`);
  console.error(
    "Available: generate:types, migrate, migrate:create, migrate:status, …",
  );
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
