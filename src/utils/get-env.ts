type EnvVariables = {
  readonly ENV: "production" | "staging" | "development" | "test";
  readonly NODE_ENV: "production" | "development";
  readonly NEXT_PUBLIC_NODE_API: string;
  readonly NEXT_PUBLIC_SITE_URL: string;
  readonly NEXT_PUBLIC_ADMIN_URL: string;
  readonly NEXTAUTH_URL: string;
  readonly SECRET: string;
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  readonly FACEBOOK_CLIENT_ID: string;
  readonly FACEBOOK_CLIENT_SECRET: string;
  readonly EMAIL_SERVER_HOST: string;
  readonly EMAIL_SERVER_PORT: string;
  readonly EMAIL_SERVER_USER: string;
  readonly EMAIL_SERVER_PASSWORD: string;
  readonly EMAIL_FROM: string;
};
export function getEnv(
  name: keyof EnvVariables
): EnvVariables[keyof EnvVariables] {
  const val = process.env[name];
  if (!val) {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }
  return val;
}
