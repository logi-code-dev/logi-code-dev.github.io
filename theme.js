const themeToggle = document.querySelector("#theme-toggle");
const root = document.documentElement;
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function getTheme() {
  return root.dataset.theme || (systemTheme.matches ? "dark" : "light");
}

function updateThemeToggle() {
  const isDark = getTheme() === "dark";
  themeToggle.setAttribute("aria-checked", String(isDark));
  themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
}

themeToggle.addEventListener("click", () => {
  const theme = getTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = theme;

  try {
    localStorage.setItem("logicode-theme", theme);
  } catch {}

  updateThemeToggle();
});

systemTheme.addEventListener("change", () => {
  if (!root.hasAttribute("data-theme")) {
    updateThemeToggle();
  }
});

updateThemeToggle();
