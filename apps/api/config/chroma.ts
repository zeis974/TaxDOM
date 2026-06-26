import env from "#start/env"

/**
 * Single source of truth for the Chroma + Ollama configuration. The Chroma
 * client takes host/port/ssl separately, so we parse the `CHROMA_URL` here.
 */

function parseUrl(raw: string): { host: string; port: number; ssl: boolean } {
  const u = new URL(raw)
  const ssl = u.protocol === "https:"
  return {
    host: u.hostname,
    port: Number(u.port) || (ssl ? 443 : 80),
    ssl,
  }
}

export const chromaConfig = {
  ...parseUrl(env.get("CHROMA_URL")),
  collection: env.get("CHROMA_COLLECTION"),
}

export const ollamaConfig = {
  host: env.get("OLLAMA_URL"),
  model: env.get("OLLAMA_EMBED_MODEL"),
  dim: env.get("EMBEDDING_DIM"),
}
