export default defineContentScript({
  // https://www.bilibili.com/
  matches: ['*://*.bilibili.com/*'],
  main() {
    injectCustomStyle()
    popupFormStorage.watch(() => {
      injectCustomStyle()
    })

    injectHomeStyle()
    searchHistoryStorage.watch(() => {
      injectHomeStyle()
    })

  },
});

async function injectCustomStyle() {
  // 删除旧的自定义style标签，避免重复
  const styleId = 'ext‑bilibili‑custom‑style'
  const oldStyle = document.getElementById(styleId)
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
  styleEl.id = styleId
  styleEl.textContent = (fontFamilyCSS ? fontFamilyCSS : '') +
    (upNameCSS ? upNameCSS : '')
  document.head.appendChild(styleEl)
}

async function injectHomeStyle() {
  // 删除旧的自定义style标签，避免重复
  const styleId = 'ext‑bilibili‑home‑style'
  const oldStyle = document.getElementById(styleId)
  if (oldStyle) oldStyle.remove()

  // 读取存储的配置
  const storageData = await searchHistoryStorage.getValue()
  if (storageData) return

  const cssText = `
    .search-panel .history {
        display: none;
    }
  `
  const styleEl = document.createElement('style')
  styleEl.id = styleId
  styleEl.textContent = cssText
  document.head.appendChild(styleEl)
}
