export default defineContentScript({
  // https://www.bilibili.com/
  matches: ['https://www.bilibili.com/*'],
  main() {
    injectCustomStyle()
    // 监听storage变化，不用刷新页面即可更新样式
    searchHistoryStorage.watch(() => {
      injectCustomStyle()
    })

  },
});

async function injectCustomStyle() {
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
