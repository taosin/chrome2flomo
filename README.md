# Chrome to Flomo

你可以在 [Chrome 插件商店](https://chromewebstore.google.com/detail/nenahpianlekkkkmgfncidogdnfhglci?utm_source=item-share-cb) 中安装它。

一个简单易用的 Chrome 扩展，帮助您快速将网页内容保存到 Flomo。

## 功能特点

- 🖱️ 右键菜单快速保存
- 🏷️ 支持自定义标签
- 🔔 保存成功/失败通知
- ⚡ 一键跳转到 Flomo
- 🔒 安全的 API Key 存储

## 安装步骤

1. 下载或克隆此仓库到本地
2. 打开 Chrome 浏览器，进入扩展程序页面（chrome://extensions/）
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择此项目的文件夹

## 使用方法

### 初始设置

1. 安装扩展后，点击扩展图标
2. 在弹出的设置页面中输入您的 Flomo API Key
3. 可以添加常用的标签（可选）

### 保存内容

1. 在任意网页中选中要保存的文本
2. 右键点击，选择"保存到 Flomo"
3. 内容会自动保存到您的 Flomo 中
4. 保存成功后会显示通知，可以点击"查看 Flomo"直接跳转

### 获取 Flomo API Key

1. 登录您的 Flomo 账号
2. 进入设置页面
3. 在 API 设置中获取您的 API Key

## 注意事项

- 请妥善保管您的 API Key
- 确保网络连接正常
- 如遇到问题，请检查 API Key 是否正确
- 标签会自动添加到保存的内容中

## 开发相关

### 项目结构

```
chrome2flomo/
├── manifest.json    # 扩展配置文件
├── background.js    # 后台脚本
├── popup.html      # 弹出窗口
├── popup.js        # 弹出窗口逻辑
├── options.html    # 设置页面
├── options.js      # 设置页面逻辑
└── icons/          # 图标文件夹
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### 技术栈

- Chrome Extension Manifest V3
- JavaScript
- HTML/CSS

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
