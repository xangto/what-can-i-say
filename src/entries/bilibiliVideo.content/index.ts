import {defineContentScript} from "#imports";
import type {popupFrom} from "@/types/types.ts";
import {popupFormStorage} from "../utils/storage";

export default defineContentScript({
  matches: ['*://*.bilibili.com/video/*'],
  main() {
    // .bpx-player-ctrl-btn.bpx-player-ctrl-web 网页全屏按钮
    // .bpx-state-entered 全屏后增加类名
    let observer: MutationObserver | null = null;
    let triggered = false;

    function destroyObserver() {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    }

    function watchPlayer() {
      destroyObserver();
      triggered = false;

      observer = new MutationObserver(() => {
        popupFormStorage.getValue().then(storageData => {
          if (!storageData?.autoWebFullScreen) return;
          // 获取网页全屏按钮
          const webFullBtn = document.querySelector('.bpx-player-ctrl-btn.bpx-player-ctrl-web');
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
            function onceClick() {
              webFullBtn.click();
              triggered = true;
              document.body.removeEventListener('click', onceClick);
            },
            {once: true}
          );
        });

      })

      // 监听整个文档子树变化
      observer.observe(document.body, {
        subtree: true,
        childList: true
      });

    }

    // 初次执行
    watchPlayer();
    // 页面卸载，销毁观察器
    window.addEventListener('beforeunload', () => {
      destroyObserver();
    });

  }
})


