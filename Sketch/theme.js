(() => {
  const beacon = document.createElement("script");
  beacon.async = true;
  beacon.dataset.goatcounter = "https://fandom-page.goatcounter.com/count";
  beacon.src = "https://gc.zgo.at/count.js";
  document.head.appendChild(beacon);

  const root = document.documentElement;
  const key = "site-theme";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  const savedTheme = () => {
    try {
      const value = localStorage.getItem(key);
      return value === "dark" || value === "light" ? value : null;
    } catch (_) {
      return null;
    }
  };

  root.dataset.theme = savedTheme() || (systemTheme.matches ? "dark" : "light");

  const start = () => {
    const nav = document.querySelector(".site-nav");
    if (!nav) return;

    const toggle = document.createElement("button");
    toggle.className = "theme-toggle";
    toggle.type = "button";
    toggle.innerHTML = '<span class="theme-icon" aria-hidden="true"></span><span class="theme-label"></span>';
    nav.appendChild(toggle);

    const icon = toggle.querySelector(".theme-icon");
    const label = toggle.querySelector(".theme-label");
    const themeColor = document.querySelector('meta[name="theme-color"]');

    const render = (theme) => {
      const next = theme === "dark" ? "light" : "dark";
      root.dataset.theme = theme;
      icon.textContent = next === "light" ? "☼" : "☾";
      label.textContent = next === "light" ? "DAY" : "NIGHT";
      toggle.setAttribute("aria-label", `切换至${next === "light" ? "日间" : "夜间"}模式`);
      toggle.title = toggle.getAttribute("aria-label");
      if (themeColor) themeColor.content = getComputedStyle(document.body).getPropertyValue("--bg").trim();
    };

    render(root.dataset.theme);
    toggle.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem(key, next); } catch (_) {}
      render(next);
    });
    systemTheme.addEventListener("change", (event) => {
      if (!savedTheme()) render(event.matches ? "dark" : "light");
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
