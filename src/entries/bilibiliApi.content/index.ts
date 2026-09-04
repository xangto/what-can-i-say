export default defineContentScript({
  matches: ["*://search.bilibili.com/*"],
  runAt: "document_start", // 在页面脚本执行前完成劫持，关键
  main() {
    const url = browser.runtime.getURL("/bilibiliApiInject.js")
    const script = document.createElement("script");
    script.setAttribute("type", "module");
    script.setAttribute("src", url);
    (document.head || document.documentElement).prepend(script);
  },
});
