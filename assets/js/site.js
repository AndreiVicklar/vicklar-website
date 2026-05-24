document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-current-year]").forEach(node => {
    node.textContent = new Date().getFullYear();
  });

  document.querySelectorAll("a[data-mailto-fallback]").forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href") || "";
      const email = link.getAttribute("data-mailto-fallback") || "office@vicklar.com";

      // Keep the standard mailto behaviour, but trigger it explicitly as well.
      // Some browsers or local test environments do nothing when no default mail app is configured,
      // so the fallback still copies the address and tells the visitor what happened.
      if (href.startsWith("mailto:")) {
        event.preventDefault();
        window.location.href = href;
      }

      if (navigator.clipboard && email) {
        navigator.clipboard.writeText(email).catch(() => {});
      }

      let toast = document.querySelector("[data-mail-toast]");
      if (!toast) {
        toast = document.createElement("div");
        toast.setAttribute("data-mail-toast", "true");
        toast.className = "mail-toast";
        document.body.appendChild(toast);
      }
      toast.textContent = `Opening your email app. If it did not open, the address was copied: ${email}`;
      toast.classList.add("show");
      window.clearTimeout(window.__vicklarMailToastTimer);
      window.__vicklarMailToastTimer = window.setTimeout(() => {
        toast.classList.remove("show");
      }, 4200);
    });
  });
});
