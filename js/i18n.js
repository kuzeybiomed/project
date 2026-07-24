/* Lightweight i18n: loads i18n/<lang>.json, swaps [data-i18n] text nodes.
   Language persists to localStorage. Default TR. */
(function () {
  const KEY = "kbm-lang";
  const DEFAULT = "tr";
  let dict = {};

  function currentLang() {
    return localStorage.getItem(KEY) || DEFAULT;
  }

  function lookup(key) {
    return key.split(".").reduce((o, k) => (o && o[k] != null ? o[k] : null), dict);
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = lookup(el.getAttribute("data-i18n"));
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      // format: "placeholder:key" — sets an attribute to a translated string
      el.getAttribute("data-i18n-attr").split(",").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        const val = lookup(key);
        if (val != null) el.setAttribute(attr, val);
      });
    });
  }

  async function load(lang) {
    const res = await fetch(`i18n/${lang}.json`);
    dict = await res.json();
    document.documentElement.setAttribute("lang", lang);
    applyTranslations();
    const btn = document.getElementById("langToggle");
    if (btn) btn.textContent = lang.toUpperCase();
  }

  window.KBM = window.KBM || {};

  window.KBM.initI18n = async function () {
    await load(currentLang());
    const btn = document.getElementById("langToggle");
    if (btn) {
      btn.addEventListener("click", async () => {
        const next = currentLang() === "tr" ? "en" : "tr";
        localStorage.setItem(KEY, next);
        await load(next);
      });
    }
  };
})();
