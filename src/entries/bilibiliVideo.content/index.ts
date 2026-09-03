import {defineContentScript} from "#imports";
import type {popupFrom} from "@/types/types.ts";
import {autoWebFullscreenStorage} from "../utils/storage";
import showToast from "../utils/showToast";
import waitElement from "../utils/waitElement";

export default defineContentScript({
  matches: ['*://*.bilibili.com/video/*'],
  main() {
    // .bpx-player-ctrl-btn.bpx-player-ctrl-web 网页全屏按钮
    // .bpx-state-entered 全屏后增加类名
    let triggered = false;

    function watchPlayer() {
      triggered = false;

      autoWebFullscreenStorage.getValue().then(async storageData => {
        if (!storageData) return;
        // 获取网页全屏按钮
        const webFullBtn = await waitElement('.bpx-player-ctrl-btn.bpx-player-ctrl-web');
        // 判断已经处于网页全屏状态
        const isWebFull = document.querySelector('.bpx-player-ctrl-btn.bpx-player-ctrl-web.bpx-state-entered');

        if (!webFullBtn) {
          triggered = false;
          return;
        }
        // 已经网页全屏 || 已经触发过，直接跳过
        if (isWebFull || triggered) return;

        // ⚠️浏览器安全限制：必须等待用户一次点击，不能脚本自动click
        document.body.addEventListener(
          'click',
          function onceClick(e) {
            webFullBtn.click();
            triggered = true;
            document.body.removeEventListener('click', onceClick);
          },
          {once: true}
        );
      });

    }

    // 初次执行
    watchPlayer();

    // 监听事件
    browser.runtime.onMessage.addListener((msg) => {
      if (msg?.action === "copyBv") {
        const bv = getBvId()
        if (!bv) {
          showToast('未获取到BV号')
          return
        }
        try {
          navigator.clipboard.writeText(bv)
          showToast('复制成功')
        } catch (err) {
          console.error(err)
        }
      }
    })

  }
})

// 获取BV号
function getBvId(): string {
  // URL正则降级
  const bvMatch = location.href.match(/\/video\/(BV[\w]+)/i)
  const avMatch = location.href.match(/\/video\/(av[\w]+)/i)
  return bvMatch ? bvMatch[1] : (avMatch ? avMatch[1] : '')
}


