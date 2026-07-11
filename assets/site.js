// Shared behavior: theme toggle, mobile nav, back-to-top, workshop autosave.
// Feature-detects per page so one file can be included everywhere.
(function () {
  "use strict";

  /* Theme toggle -------------------------------------------------- */
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "auto";
  }
  function applyTheme(theme) {
    if (theme === "auto") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("ai-video-tutorial-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("ai-video-tutorial-theme", theme);
    }
    updateToggleIcon();
  }
  function prefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function isDarkNow() {
    var t = currentTheme();
    if (t === "dark") return true;
    if (t === "light") return false;
    return prefersDark();
  }
  function updateToggleIcon() {
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.textContent = isDarkNow() ? "☀️" : "🌙";
      btn.setAttribute("aria-label", isDarkNow() ? "Switch to light mode" : "Switch to dark mode");
    });
  }
  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyTheme(isDarkNow() ? "light" : "dark");
    });
  });
  updateToggleIcon();

  /* Mobile hamburger nav ------------------------------------------- */
  document.querySelectorAll(".nav-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var links = document.querySelector(".site-nav .links");
      if (!links) return;
      var open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* Back-to-top button ----------------------------------------------- */
  var backToTop = document.createElement("button");
  backToTop.id = "back-to-top";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.textContent = "↑";
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(backToTop);
  window.addEventListener("scroll", function () {
    backToTop.classList.toggle("show", window.scrollY > 500);
  }, { passive: true });

  /* Workshop autosave (only runs if the workshop's inputs exist) ---- */
  var workshopIds = ["topic", "audience", "length", "tone", "subject", "setting",
    "style", "negatives", "shotcount", "shot1", "shot2", "shot3", "shot4"];
  var workshopFields = workshopIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if (workshopFields.length) {
    var STORAGE_KEY = "ai-video-tutorial-workshop";
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      workshopFields.forEach(function (el) {
        if (saved[el.id] !== undefined) el.value = saved[el.id];
      });
    } catch (e) { /* ignore corrupt storage */ }

    var note = document.createElement("p");
    note.className = "autosave-note";
    var lastField = workshopFields[workshopFields.length - 1];
    lastField.closest(".exercise").insertAdjacentElement("afterend", note);

    var saveTimer;
    function save() {
      var data = {};
      workshopFields.forEach(function (el) { data[el.id] = el.value; });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      note.textContent = "Draft saved in this browser ✓";
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function () { note.textContent = ""; }, 2000);
    }
    workshopFields.forEach(function (el) {
      el.addEventListener("input", save);
    });
  }
})();
