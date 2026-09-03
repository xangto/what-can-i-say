function showToast(text: string, duration = 1500) {
  let toast = document.getElementById("ext-bili-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "ext-bili-toast";
    Object.assign(toast.style, {
      position: "fixed",
      top: "16px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0,0,0,0.75)",
      color: "#fff",
      padding: "8px 16px",
      borderRadius: "6px",
      zIndex: "999999",
      fontSize: "14px",
    });
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, duration);
}

export default showToast
