// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveToFlomo",
    title: "保存到 Flomo",
    contexts: ["selection"],
  });
});

// 处理右键菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveToFlomo") {
    const selectedText = info.selectionText;
    const pageUrl = tab.url;
    const pageTitle = tab.title;

    // 从存储中获取 API Key 和标签
    chrome.storage.sync.get(["flomoApiKey", "flomoTags"], async (result) => {
      if (!result.flomoApiKey) {
        // 如果没有设置 API Key，打开设置页面
        chrome.runtime.openOptionsPage();
        return;
      }

      try {
        // 构建内容，包含标签
        let content = selectedText;
        if (result.flomoTags && result.flomoTags.length > 0) {
          content += "\n\n#" + result.flomoTags.join(" ");
        }
        content += `\n\n来源：${pageTitle}\n链接：${pageUrl}`;

        const response = await fetch(result.flomoApiKey, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: content,
          }),
        });

        if (response.ok) {
          // 显示成功通知
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon128.png",
            title: "保存成功",
            message: "内容已成功保存到 Flomo",
            buttons: [{ title: "查看 Flomo" }],
            requireInteraction: true,
          });

          // 监听通知按钮点击
          chrome.notifications.onButtonClicked.addListener(
            (notificationId, buttonIndex) => {
              if (buttonIndex === 0) {
                // 打开 Flomo 网站
                chrome.tabs.create({ url: "https://flomoapp.com" });
              }
            }
          );
        } else {
          throw new Error("保存失败");
        }
      } catch (error) {
        // 显示错误通知
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/icon128.png",
          title: "保存失败",
          message: error.message || "请检查 API Key 是否正确",
          requireInteraction: true,
        });
      }
    });
  }
});
