import { knowledge } from "../data/knowledge.js";

export async function getKnowledge() {
  return knowledge;
}

export async function getKnowledgeBySlug(slug) {
  const list = await getKnowledge();
  return list.find(item => item.slug === slug) || null;
}
