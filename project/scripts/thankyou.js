const urlParams = new URLSearchParams(window.location.search);

document.getElementById("first-name").textContent = urlParams.get("firstName") || "N/A";
document.getElementById("last-name").textContent = urlParams.get("lastName") || "N/A";
document.getElementById("email").textContent = urlParams.get("email") || "N/A";
document.getElementById("tip").textContent = urlParams.get("tip") || "N/A";

const timestamp = urlParams.get("timestamp") ? new Date(urlParams.get("timestamp")).toLocaleString() : new Date().toLocaleString();
document.getElementById("timestamp").textContent = timestamp;