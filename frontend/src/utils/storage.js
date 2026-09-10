import { appConfig } from "../config/app.js";

// 收藏与浏览历史在 localStorage 中持久化，后续后端阶段可替换为 API。
const { favorites, history } = appConfig.storageKeys;

function read(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 忽略存储失败
  }
}

export function getFavorites() {
  return read(favorites);
}

export function isFavorite(id) {
  return read(favorites).some(item => item.id === id);
}

export function toggleFavorite(item) {
  const list = read(favorites);
  const idx = list.findIndex(x => x.id === item.id);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.unshift({ ...item, savedAt: Date.now() });
  }
  write(favorites, list);
  return idx < 0;
}

export function getHistory() {
  return read(history);
}

export function addHistory(item) {
  const list = read(history).filter(x => x.id !== item.id);
  list.unshift({ ...item, viewedAt: Date.now() });
  write(history, list.slice(0, 50));
}

export function clearHistory() {
  write(history, []);
}
