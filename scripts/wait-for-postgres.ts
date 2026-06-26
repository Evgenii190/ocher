const MAX_ATTEMPTS = 30;
const INTERVAL_MS = 1000;

const user = process.env.POSTGRES_USER ?? "postgres";
const db = process.env.POSTGRES_DB ?? "ochko";

async function isPostgresReady(): Promise<boolean> {
  const proc = Bun.spawn({
    cmd: [
      "docker",
      "compose",
      "exec",
      "-T",
      "db",
      "pg_isready",
      "-U",
      user,
      "-d",
      db,
    ],
    stdout: "ignore",
    stderr: "ignore",
  });

  return (await proc.exited) === 0;
}

console.log("Ожидание Postgres…");

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
  if (await isPostgresReady()) {
    console.log(`Postgres готов (попытка ${attempt}/${MAX_ATTEMPTS})`);
    process.exit(0);
  }

  await Bun.sleep(INTERVAL_MS);
}

console.error(
  `Postgres не ответил за ${(MAX_ATTEMPTS * INTERVAL_MS) / 1000} с. Проверьте docker compose и COMPOSE_PROFILES=dev.`,
);
process.exit(1);
