/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from "@adonisjs/core/env"

export default await Env.create(new URL("../", import.meta.url), {
  NODE_ENV: Env.schema.enum(["development", "production", "test"] as const),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.secret(),
  HOST: Env.schema.string({ format: "host" }),
  LOG_LEVEL: Env.schema.enum(["fatal", "error", "warn", "info", "debug", "trace"]),

  /*
  |----------------------------------------------------------
  | Variables for configuring session package
  |----------------------------------------------------------
  */
  SESSION_DRIVER: Env.schema.enum(["cookie", "memory"] as const),

  /*
  |----------------------------------------------------------
  | Variables for database
  |----------------------------------------------------------
  */
  DB_URL: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring the limiter package
  |----------------------------------------------------------
  */
  LIMITER_STORE: Env.schema.enum(["redis", "memory"] as const),

  REDIS_HOST: Env.schema.string({ format: "host" }),
  REDIS_PORT: Env.schema.number(),
  REDIS_PASSWORD: Env.schema.string.optional(),

  /*
  |----------------------------------------------------------
  | Variables for resolving the visitor IP behind a proxy.
  | TRUSTED_PROXIES is consumed by proxy-addr semantics (IPs,
  | CIDRs or presets), PROXY_SHARED_SECRET authenticates the
  | X-Taxdom-Client-IP header sent by the Next.js server.
  |----------------------------------------------------------
  */
  TRUSTED_PROXIES: Env.schema.string.optional(),
  PROXY_SHARED_SECRET: Env.schema.secret.optional(),

  /*
  |----------------------------------------------------------
  | Variables for authentification
  |----------------------------------------------------------
  */
  BETTER_AUTH_URL: Env.schema.string({ format: "url", protocol: true, tld: false }),
  BETTER_AUTH_SECRET: Env.schema.secret(),
  GOOGLE_CLIENT_ID: Env.schema.string(),
  GOOGLE_CLIENT_SECRET: Env.schema.string(),
  TRUSTED_APP_ORIGIN_URL: Env.schema.string({ format: "url", protocol: false, tld: false }),
  TRUSTED_DASHBOARD_ORIGIN_URL: Env.schema.string({ format: "url", protocol: false, tld: false }),

  /*
  |----------------------------------------------------------
  | Variables for the internal API key (shared secret between
  | the API and the Next.js server). Used by the apiKey
  | middleware to protect POST public routes.
  |----------------------------------------------------------
  */
  API_KEY: Env.schema.secret(),
})
