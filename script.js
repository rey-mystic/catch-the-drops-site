// Catch The Drops — shared JS

(function initTheme(){
  const root = document.documentElement;
  const saved = localStorage.getItem("ctd-theme");
  if(saved === "dark") root.classList.add("dark");
})();




function toggleTheme(){
  const root = document.documentElement;
  root.classList.toggle("dark");

  const sun = document.getElementById("icon-sun");
  const moon = document.getElementById("icon-moon");

  if(root.classList.contains("dark")){
    sun.style.display = "none";
    moon.style.display = "inline";
  } else {
    sun.style.display = "inline";
    moon.style.display = "none";
  }
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

function toggleNav(){
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("open");
}

// Auto detect correct path for SVG even in subfolders
function getSVG(path){
  // cek apakah halaman berada di subfolder
  const depth = window.location.pathname.split("/").length;
  return depth > 2 ? "../img/" + path : "img/" + path;
}

document.getElementById("icon-sun").src  = getSVG("sun.svg");
document.getElementById("icon-moon").src = getSVG("moon.svg");

// set SVG path otomatis (root vs subfolder)
function getSVG(file){
  const isSubfolder = window.location.pathname.includes("/airdrops/");
  return isSubfolder ? `../img/${file}` : `img/${file}`;
}

// pas halaman selesai load, baru set src
document.addEventListener("DOMContentLoaded", () => {
  const sun = document.getElementById("icon-sun");
  const moon = document.getElementById("icon-moon");
  if(!sun || !moon) return;

  sun.src = getSVG("sun.svg");
  moon.src = getSVG("moon.svg");

  // sync icon sesuai theme saat load
  const root = document.documentElement;
  if(root.classList.contains("dark")){
    sun.style.display = "none";
    moon.style.display = "inline";
  } else {
    sun.style.display = "inline";
    moon.style.display = "none";
  }
});

