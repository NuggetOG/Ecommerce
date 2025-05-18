import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Show alert and offer a login link
      if (!document.getElementById("session-expired-alert")) {
        const div = document.createElement("div");
        div.id = "session-expired-alert";
        div.style.position = "fixed";
        div.style.top = "20px";
        div.style.left = "50%";
        div.style.transform = "translateX(-50%)";
        div.style.background = "#fff";
        div.style.border = "1px solid #e53e3e";
        div.style.color = "#e53e3e";
        div.style.padding = "16px 32px";
        div.style.borderRadius = "8px";
        div.style.zIndex = "9999";
        div.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        div.innerHTML = `
          <span>Your session has expired. </span>
          <a href="/login" style="color:#3182ce;text-decoration:underline;font-weight:bold;">Login again</a>
        `;
        document.body.appendChild(div);
      }
      localStorage.removeItem("currentUser");
    }
    return Promise.reject(error);
  }
);

export default api;