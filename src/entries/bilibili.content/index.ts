import {defineContentScript, storage} from "#imports";
import './bilibili-custom.css'

export default defineContentScript({
  // https://www.bilibili.com/
  matches: ['*://*.bilibili.com/*'],
  main() {
    console.log('哔哩哔哩 干杯');

    injectCustomStyle()
    // 监听storage变化，不用刷新页面即可更新样式
    storage.watch('local:bilibili_style', () => {
      injectCustomStyle()
    })
  },
});

async function injectCustomStyle() {
  // 删除旧的自定义style标签，避免重复
  const oldStyle = document.getElementById('ext‑bilibili‑custom‑style')
  if(oldStyle) oldStyle.remove()

  // 读取存储的配置
  const storageData = await storage.getItem('local:bilibili_style')
  const cfg = JSON.parse(storageData)
  if(!cfg) return

  // 构建CSS，可自行调整选择器，这里设置全局body字体样式
  const cssText = `
    body {
      font-family: ${cfg.fontFamily} !important;
    }
  `
  const styleEl = document.createElement('style')
  styleEl.id = 'ext‑bilibili‑custom‑style'
  styleEl.textContent = cssText
  document.head.appendChild(styleEl)
}
