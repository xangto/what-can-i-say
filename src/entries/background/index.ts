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
          id: 'text',
          title: '文本操作',
          contexts: ['selection']
        })
        browser.contextMenus.create({
          parentId: 'text',
          id: 'youdao-translate',
          title: '  有道翻译',
          contexts: ['selection']
        })
      })
    })

    // 监听右键菜单点击
    browser.contextMenus.onClicked.addListener((info) => {
      if (info.menuItemId === "youdao-translate" && info.selectionText) {
        const q = encodeURIComponent(info.selectionText)
        const targetUrl = `https://dict.youdao.com/search?q=${q}`
        browser.tabs.create({url: targetUrl})
      }
    })
  }
});
