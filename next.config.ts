import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Слим-сборка для Docker: Next трассирует зависимости в .next/standalone,
  // поэтому в prod-образ не нужно копировать весь node_modules.
  output: "standalone",
};

export default withPayload(withNextIntl(nextConfig));
