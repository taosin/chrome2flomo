document.addEventListener("DOMContentLoaded", () => {
  const apiKeyInput = document.getElementById("apiKey");
  const saveButton = document.getElementById("save");
  const statusDiv = document.getElementById("status");

  // 加载已保存的 API Key
  chrome.storage.sync.get(["flomoApiKey"], (result) => {
    if (result.flomoApiKey) {
      apiKeyInput.value = result.flomoApiKey;
    }
  });

  // 保存 API Key
  saveButton.addEventListener("click", () => {
    const apiKey = apiKeyInput.value.trim();

    if (!apiKey) {
      showStatus("请输入 API Key", "error");
      return;
    }

    chrome.storage.sync.set({ flomoApiKey: apiKey }, () => {
      showStatus("API Key 已保存", "success");
    });
  });

  // 显示状态信息
  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = "block";

    setTimeout(() => {
      statusDiv.style.display = "none";
    }, 3000);
  }
});
