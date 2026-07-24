/* Theme toggle: persists to localStorage, respects OS preference on first visit. */
(function () {
  const KEY = "kbm-theme";
  const root = document.documentElement;

  function systemPref() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
  }

  function current() {
    return localStorage.getItem(KEY) || systemPref();
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    const icon = document.querySelector(".theme-icon");
    if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  // Apply ASAP (before header loads) to avoid flash.
  apply(current());

  // Bind toggle once header partial is injected.
  window.KBM = window.KBM || {};
  window.KBM.initTheme = function () {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    apply(current());
    btn.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(KEY, next);
      apply(next);
    });
  };
})();
