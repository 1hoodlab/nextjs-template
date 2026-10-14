/**
 * Server-side env helpers. Add validated parsing (e.g. Zod) when the app grows.
 */
export const appEnv = process.env.APP_ENV ?? "development";

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
