"use strict";
const shots = {
  home: { ar: "صديقك الجاي", en: "Your next companion" },
  welcome: { ar: "أول الحكاية", en: "A warm welcome" },
  map: { ar: "نساعدهم يرجعون", en: "A way back home" },
  listing: { ar: "شارك حكايته", en: "Tell their story" },
  order: { ar: "كل خطوة واضحة", en: "Every step, clear" },
};
let lang = "ar",
  selected = "home",
  lastOpener = null;
const tabs = [...document.querySelectorAll("[role=tab]")],
  dialog = document.getElementById("lightbox");
const order = ["welcome", "home", "map", "listing", "order"];
function changeLanguage(next) {
  lang = next;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-ar][data-en]").forEach((el) => {
    el.textContent = el.dataset[lang];
  });
  const button = document.getElementById("language");
  button.textContent = lang === "ar" ? "EN" : "عربي";
  button.setAttribute(
    "aria-label",
    lang === "ar" ? "Switch to English" : "التبديل للعربية",
  );
  document.title =
    lang === "ar"
      ? "مياو — كل قط، له حكاية · حسين أبوزينة"
      : "miao — Little paws. Big stories. · Hussein Abozina";
  try {
    localStorage.setItem("miao-site-language", lang);
  } catch {}
  if (dialog.open) updateLightbox();
}
document
  .getElementById("language")
  .addEventListener("click", () => changeLanguage(lang === "ar" ? "en" : "ar"));
try {
  if (localStorage.getItem("miao-site-language") === "en") changeLanguage("en");
} catch {}
function selectTab(tab) {
  tabs.forEach((t) => {
    const active = t === tab;
    t.classList.toggle("active", active);
    t.setAttribute("aria-selected", String(active));
    t.tabIndex = active ? 0 : -1;
  });
  const image = document.getElementById("story-image");
  image.src = `assets/screens/${tab.dataset.screen}.jpg`;
  image.alt = shots[tab.dataset.screen][lang];
  document
    .getElementById("story-panel")
    .setAttribute("aria-labelledby", tab.id);
}
tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (e) => {
    let index;
    if (["ArrowDown", "ArrowRight"].includes(e.key))
      index = (i + 1) % tabs.length;
    if (["ArrowUp", "ArrowLeft"].includes(e.key))
      index = (i + tabs.length - 1) % tabs.length;
    if (e.key === "Home") index = 0;
    if (e.key === "End") index = tabs.length - 1;
    if (index !== undefined) {
      e.preventDefault();
      tabs[index].focus();
      selectTab(tabs[index]);
    }
  });
});
const media = window.matchMedia("(max-width:800px)");
function orient() {
  document
    .querySelector("[role=tablist]")
    .setAttribute(
      "aria-orientation",
      media.matches ? "horizontal" : "vertical",
    );
}
media.addEventListener("change", orient);
orient();
function updateLightbox() {
  const img = document.getElementById("lightbox-image");
  img.src = `assets/screens/${selected}.jpg`;
  img.alt = shots[selected][lang];
  document.getElementById("lightbox-title").textContent =
    `miao / ${shots[selected][lang]}`;
  document.getElementById("counter").textContent =
    `${order.indexOf(selected) + 1} / ${order.length}`;
}
function openShot(key, opener) {
  selected = key;
  lastOpener = opener;
  updateLightbox();
  dialog.showModal();
  document.body.style.overflow = "hidden";
}
document
  .querySelectorAll(".gallery-open")
  .forEach((b) =>
    b.addEventListener("click", () => openShot(b.dataset.screen, b)),
  );
document
  .getElementById("story-zoom")
  .addEventListener("click", (e) =>
    openShot(
      document.querySelector("[role=tab][aria-selected=true]").dataset.screen,
      e.currentTarget,
    ),
  );
document
  .getElementById("close-lightbox")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => {
  document.body.style.overflow = "";
  lastOpener?.focus();
});
function move(delta) {
  selected =
    order[(order.indexOf(selected) + delta + order.length) % order.length];
  updateLightbox();
  dialog.scrollTop = 0;
}
document.getElementById("previous").addEventListener("click", () => move(-1));
document.getElementById("next").addEventListener("click", () => move(1));
dialog.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    e.preventDefault();
    move(lang === "ar" ? -1 : 1);
  }
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    move(lang === "ar" ? 1 : -1);
  }
});
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
