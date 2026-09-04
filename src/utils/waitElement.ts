/**
 * 等待元素出现
 * @param selector css选择器
 * @param timeout 超时毫秒，0=永不超时
 */
export default function waitElement(selector: string, timeout = 0): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    const el = document.querySelector<HTMLElement>(selector);
    if (el) {
      resolve(el);
      return;
    }

    let observer: MutationObserver | null = new MutationObserver((mutations) => {
      const elem = document.querySelector<HTMLElement>(selector);
      if (elem) {
        observer?.disconnect();
        observer = null;
        resolve(elem);
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });

    if (timeout > 0) {
      setTimeout(() => {
        observer?.disconnect();
        observer = null;
        reject(new Error(`等待元素 ${selector} 超时`));
      }, timeout);
    }
  });
}
