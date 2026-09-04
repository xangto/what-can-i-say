import waitDocumentReady from "@/utils/waitDocumentReady.ts";

export default defineContentScript({
  matches: ["*://search.bilibili.com/*"],
  runAt: "document_start", // 在页面脚本执行前完成劫持，关键
  async main() {
    // const url = browser.runtime.getURL("/bilibiliApiInject.js")
    // const script = document.createElement("script");
    // script.setAttribute("type", "module");
    // script.setAttribute("src", url);
    // (document.head || document.documentElement).prepend(script);

    await injectScript('/bilibiliApiInject.js', {
      keepInDom: false,
      modifyScript(script) {
        // 在注入脚本加载之前添加监听器。
        script.addEventListener('from-bilibili-api-injected-script', (event) => {
          if (event instanceof CustomEvent) {
            // console.log(`${event.type}:`, event.detail);
            // const {detail} = event;
            // const map = detail.authorMap as Map<string, number>
            // let maxCount = 0;
            // for (const count of map.values()) {
            //   if (count > maxCount) maxCount = count;
            // }
            //
            // // 收集所有达到最大值的作者
            // const topAuthors: string[] = [];
            // for (const [author, count] of map) {
            //   if (count === maxCount) topAuthors.push(author);
            // }
            //
            // const topAuthorStr = topAuthors.length ? topAuthors.join("、") : "";
            //
            // const text1 = `视频总数：${detail.totalVideo}，广告总数：${detail.totalAd}`
            // // 如果 maxCount 为 1
            // const text2 = (maxCount > 1) ? `<br />视频数量最多的up是：${topAuthorStr}，数量：${maxCount}` : ''
            // console.log(text1 + text2)
            // showToast(text1 + text2, 2000)
          }
        });
      }
    })

    // 在注入脚本加载之后发送事件。
    // script.dispatchEvent(
    //   new CustomEvent('from-content-script', {
    //     detail: 'General Kenobi',
    //   }),
    // )

    // 等待DOM解析完成之后
    await waitDocumentReady()

    // 搜索页面查询按钮
    waitElement('.search-header .search-button').then((el) => {
      el.click()
      console.log(".search-header .search-button")
    })

  },
});
