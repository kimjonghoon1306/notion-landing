// BlogAuto Pro - Notion Template 공통 API 헬퍼
// notion-landing/js/api.js

const API_BASE = "https://www.blogautopro.com/api/notion";

function getToken() {
  return localStorage.getItem("ba_token") || "";
}

export async function notionAPI(action, data = {}) {
  const token = getToken();
  if (!token) {
    window.location.href = "/app.html";
    return null;
  }
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action, data }),
    });
    const json = await res.json();
    if (!json.ok && json.error === "인증 필요") {
      localStorage.removeItem("ba_token");
      window.location.href = "/app.html";
      return null;
    }
    return json;
  } catch (e) {
    console.error("API 오류:", e);
    return { ok: false, error: "네트워크 오류" };
  }
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem("ba_user") || "{}");
  } catch { return {}; }
}

export function isLoggedIn() {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem("ba_token");
  localStorage.removeItem("ba_user");
  window.location.href = "/app.html";
}

