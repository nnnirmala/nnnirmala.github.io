document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const open = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const filterBar = document.getElementById("filters");
  if (!filterBar) return;

  const chips = [...filterBar.querySelectorAll(".chip")];
  const entries = [...document.querySelectorAll(".project-entry")];
  const statusEl = filterBar.querySelector(".filter-status");
  const emptyEl = document.getElementById("empty");

  function applyFilter(filter) {
    let visible = 0;
    entries.forEach((entry) => {
      const cats = (entry.dataset.categories || "").split(/\s+/);
      const show = filter === "all" || cats.includes(filter);
      entry.hidden = !show;
      if (show) visible++;
    });

    chips.forEach((chip) => {
      chip.setAttribute("aria-pressed", String(chip.dataset.filter === filter));
    });

    if (statusEl) {
      statusEl.textContent =
        filter === "all"
          ? `Showing all ${visible} projects`
          : `Showing ${visible} project${visible === 1 ? "" : "s"}`;
    }
    if (emptyEl) emptyEl.hidden = visible > 0;
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => applyFilter(chip.dataset.filter));
  });
});
