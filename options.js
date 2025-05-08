document.addEventListener("DOMContentLoaded", () => {
  const apiKeyInput = document.getElementById("apiKey");
  const newTagInput = document.getElementById("newTag");
  const addTagButton = document.getElementById("addTag");
  const tagList = document.getElementById("tagList");
  const saveButton = document.getElementById("save");
  const statusDiv = document.getElementById("status");

  let tags = [];

  // 加载已保存的设置
  chrome.storage.sync.get(["flomoApiKey", "flomoTags"], (result) => {
    if (result.flomoApiKey) {
      apiKeyInput.value = result.flomoApiKey;
    }
    if (result.flomoTags) {
      tags = result.flomoTags;
      renderTags();
    }
  });

  // 添加标签
  addTagButton.addEventListener("click", () => {
    const tagName = newTagInput.value.trim();
    if (tagName && !tags.includes(tagName)) {
      tags.push(tagName);
      renderTags();
      newTagInput.value = "";
    }
  });

  // 渲染标签列表
  function renderTags() {
    tagList.innerHTML = "";
    tags.forEach((tag) => {
      const tagElement = document.createElement("div");
      tagElement.className = "tag";
      tagElement.innerHTML = `
        ${tag}
        <button class="remove-tag" data-tag="${tag}">×</button>
      `;
      tagList.appendChild(tagElement);
    });

    // 添加删除标签的事件监听
    document.querySelectorAll(".remove-tag").forEach((button) => {
      button.addEventListener("click", (e) => {
        const tagToRemove = e.target.dataset.tag;
        tags = tags.filter((tag) => tag !== tagToRemove);
        renderTags();
      });
    });
  }

  // 保存设置
  saveButton.addEventListener("click", () => {
    const apiKey = apiKeyInput.value.trim();

    if (!apiKey) {
      showStatus("请输入 API Key", "error");
      return;
    }

    chrome.storage.sync.set(
      {
        flomoApiKey: apiKey,
        flomoTags: tags,
      },
      () => {
        showStatus("设置已保存", "success");
      }
    );
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
