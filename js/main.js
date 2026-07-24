/* Boot: inject header/footer partials, then init theme + i18n + nav.
   Order matters — theme/i18n bind to elements inside the partials. */
(function () {
  async function inject(selector, url) {
    const host = document.querySelector(selector);
    if (!host) return;
    const res = await fetch(url);
    host.innerHTML = await res.text();
  }

  function markActiveNav() {
    const page = (location.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";
    const link = document.querySelector(`[data-nav="${page}"]`);
    if (link) link.classList.add("active");
  }

  function initNav() {
    const burger = document.getElementById("hamburger");
    const nav = document.getElementById("nav");
    if (!burger || !nav) return;
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([
      inject("#site-header", "partials/header.html"),
      inject("#site-footer", "partials/footer.html"),
    ]);

    if (window.KBM.initTheme) window.KBM.initTheme();
    if (window.KBM.initI18n) await window.KBM.initI18n();

    markActiveNav();
    initNav();

    // stamp current year if present
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
