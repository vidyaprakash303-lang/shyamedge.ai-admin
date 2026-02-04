export function initTheme(){
  const root = document.documentElement;
  const saved = localStorage.getItem("theme") || "dark";
  root.dataset.theme = saved;
}
export function toggleTheme(){
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
  return next;
}
