// Catch The Drops — shared JS

(function initTheme(){
  const root = document.documentElement;
  const saved = localStorage.getItem("ctd-theme");
  if(saved === "dark") root.classList.add("dark");
})();

function toggleTheme(){
  const root = document.documentElement;
  root.classList.toggle("dark");
  localStorage.setItem("ctd-theme", root.classList.contains("dark") ? "dark" : "light");
  renderThemeLabel();
}

function renderThemeLabel(){
  const label = document.querySelector("[data-theme-label]");
  if(!label) return;
  const dark = document.documentElement.classList.contains("dark");
  label.textContent = dark ? "Dark" : "Light";
}

document.addEventListener("DOMContentLoaded", () => {
  // theme label
  renderThemeLabel();

  // scroll reveal
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=> e.isIntersecting && e.target.classList.add("show"));
  }, {threshold:.12});
  els.forEach(el=> io.observe(el));

  // accordions
  document.querySelectorAll(".accordion .acc-head").forEach(head=>{
    head.addEventListener("click", ()=>{
      head.parentElement.classList.toggle("open");
    });
  });

  // checklist persistence
  const checks = document.querySelectorAll("[data-checklist] input[type=checkbox]");
  if(checks.length){
    const saved = JSON.parse(localStorage.getItem("ctd-checklist") || "{}");
    checks.forEach(ch=>{
      if(saved[ch.id]) ch.checked = true;
      ch.addEventListener("change", ()=>{
        const cur = JSON.parse(localStorage.getItem("ctd-checklist") || "{}");
        cur[ch.id] = ch.checked;
        localStorage.setItem("ctd-checklist", JSON.stringify(cur));
      });
    });
  }

  // highlight active nav
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a=>{
    if(a.getAttribute("href") === path) a.classList.add("active");
  });
});
