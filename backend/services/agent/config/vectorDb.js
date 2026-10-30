import { embeddings } from "./embeddings.js";
import dotenv from "dotenv"
dotenv.config()

// Lightweight in-memory vector store (cosine similarity) so PDF RAG works
// without an external Qdrant cluster. Reuses the Google embeddings that work
// with the current key. Per-conversation only (not persisted across restarts).
const cosine = (a, b) => {
    let dot = 0, na = 0, nb = 0
    for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i] }
    return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-10)
}

export const vectorStore = async (docs, _collectionName) => {
    const vectors = await embeddings.embedDocuments(docs.map(d => d.pageContent))
    return {
        similaritySearch: async (query, k = 5) => {
            const qv = await embeddings.embedQuery(query)
            return vectors
                .map((v, i) => ({ doc: docs[i], score: cosine(qv, v) }))
                .sort((a, b) => b.score - a.score)
                .slice(0, k)
                .map(s => s.doc)
        }
    }
}
