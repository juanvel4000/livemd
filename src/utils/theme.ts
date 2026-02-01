export function initTheme() {
  const theme = localStorage.getItem("theme") || "dark";
  applyTheme(theme);
  return theme;
}

export function applyTheme(theme: string) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("theme", theme);
}

export function toggleTheme() {
  const current = localStorage.getItem("theme") || "dark";
  const newTheme = current === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  return newTheme;
}
