import { news } from "../data/news.js";

export async function getNews() {
  return news;
}

export async function getNewsById(id) {
  const list = await getNews();
  return list.find(item => item.id === id) || null;
}

export async function getNewsByCategory(category) {
  const list = await getNews();
  return category ? list.filter(item => item.category === category) : list;
}
