// BlogAuto Pro - 공통 헤더/테마 로직
// notion-landing/js/common.js

export function initTheme() {
  const saved = localStorage.getItem("bk-theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeBtn(saved);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("bk-theme", next);
  updateThemeBtn(next);
}

function updateThemeBtn(theme) {
  const btn = document.getElementById("themeBtn");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
}

export function initHeader() {
  initTheme();
  // 로그아웃
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", e => {
      e.preventDefault();
      localStorage.removeItem("ba_token");
      localStorage.removeItem("ba_user");
      window.location.href = "/app.html";
    });
  }
  // 테마 버튼
  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
}

export function toast(msg, type = "success") {
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}
