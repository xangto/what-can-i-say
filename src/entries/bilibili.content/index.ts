export default defineContentScript({
  // https://www.bilibili.com/
  matches: ['*://*.bilibili.com/*'],
  main() {
    injectCustomStyle()
    // 监听storage变化，不用刷新页面即可更新样式
    popupFormStorage.watch(() => {
      injectCustomStyle()
    })

  },
});

async function injectCustomStyle() {
  // 删除旧的自定义style标签，避免重复
  const oldStyle = document.getElementById('ext‑bilibili‑custom‑style')
  if (oldStyle) oldStyle.remove()

  // 读取存储的配置
  const storageData = await popupFormStorage.getValue()
  if (!storageData) return

  // 构建CSS，可自行调整选择器，这里设置全局body字体样式
  let fontFamilyCSS = ''
  if (storageData.fontFamily) {
    fontFamilyCSS = `
    body {
      font-family: ${storageData.fontFamily} !important;
    }
  `
  }
  let upNameCSS = ''
  if (storageData.upNameColor) {
    upNameCSS = `
    .bili-video-card__info--owner .bili-video-card__info--author,
    .upname .name {
        color: ${storageData.upNameColor} !important;
    }
  `
  }
  const styleEl = document.createElement('style')
  styleEl.id = 'ext‑bilibili‑custom‑style'
  styleEl.textContent = (fontFamilyCSS ? fontFamilyCSS : '') +
    (upNameCSS ? upNameCSS : '')
  document.head.appendChild(styleEl)
}
