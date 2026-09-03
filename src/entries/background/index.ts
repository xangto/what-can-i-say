import {browser, defineBackground} from "#imports";

export default defineBackground({
  main() {
    // 插件安装/更新时
    browser.runtime.onInstalled.addListener(() => {
      // 先清除所有旧菜单，防止多次唤醒重复创建报错
      browser.contextMenus.removeAll().then(() => {

        // 绑定到【插件工具栏图标】右键 contexts: ["action"]
        // browser.contextMenus.create({
        //   id: "guide",
        //   title: "使用指南",
        //   contexts: ["action"]
        // });
        // 创建菜单
        browser.contextMenus.create({
          id: 'level0',
          title: '曼巴out',
          contexts: ['all']
        })
        browser.contextMenus.create({
          parentId: 'level0',
          id: 'youdao-translate',
          title: '  有道翻译',
          contexts: ['selection']
        })
        browser.contextMenus.create({
          parentId: 'level0',
          id: "copy-bv-number",
          title: "复制当前视频 BV号",
          // 只在页面上下文出现；限定匹配B站视频页面
          contexts: ["page"],
          documentUrlPatterns: ["*://*.bilibili.com/video/*"]
        })
      })
    })

    // 监听右键菜单点击
    browser.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === "youdao-translate" && info.selectionText) {
        const q = encodeURIComponent(info.selectionText)
        const targetUrl = `https://dict.youdao.com/search?q=${q}`
        browser.tabs.create({url: targetUrl})
      } else if (info.menuItemId === "copy-bv-number") {
        if (!tab?.id) return

        // 向content script发送消息，让网页脚本执行复制
        browser.tabs.sendMessage(tab.id, {
          action: "copyBv"
        })
      }

    })
  }
});
