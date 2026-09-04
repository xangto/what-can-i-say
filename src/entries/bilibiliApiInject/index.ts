export default defineUnlistedScript(() => {

  // const script = document.currentScript;

  // script?.addEventListener('from-content-script', (event) => {
  //   if (event instanceof CustomEvent) {
  //     console.log(`${event.type}:`, event.detail);
  //   }
  // });

  // XHR劫持
  const OriginXHR = window.XMLHttpRequest;
  // @ts-ignore
  window.XMLHttpRequest = function () {
    const xhr = new OriginXHR();
    xhr.addEventListener("load", () => {
      const url = xhr.responseURL;
      if (url.includes("//api.bilibili.com/x/web-interface/nav")) {
        try {
          const obj = JSON.parse(xhr.responseText);
          obj.data.title = "【被劫持】" + obj.data.title;
          // console.log(obj)
          Object.defineProperty(xhr, "responseText", {
            writable: true,
            value: JSON.stringify(obj)
          })
        } catch (e) {
        }
      }
    })
    return xhr;
  }


  // 劫持 fetch
  const originFetch = window.fetch;
  window.fetch = async function (...args) {
    const [input] = args;
    const reqUrl = typeof input === "string" ? input : ("url" in input ? input.url : null);

    // console.log("reqUrl", reqUrl);
    if (!reqUrl) return originFetch.apply(window, args);

    /*首页换一批接口*/
    /*const targetApi = "//api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd"; // 视频详情接口示例
    if (reqUrl.includes(targetApi)) {
      const res = await originFetch.apply(window, args);
      const cloneRes = res.clone();
      const rawData = await cloneRes.json();

      console.log("劫持接口原始数据：", rawData);
      // ✍️在这里修改返回JSON
      const data = rawData?.data?.item ?? []
      if(data.length){
        data.forEach((item: { bvid: any; title: string; }) => {
          if(item.bvid) {
            item.title = `<span style="color: red">${item.title}</span>`;
          }
        })
      }

      // 构造全新Response返回页面，必须原样复制status+headers，否则报错
      return new Response(JSON.stringify(rawData), {
        status: res.status,
        headers: res.headers,
      });
    }*/

    /*查询页面*/
    const searchPageListApi = "//api.bilibili.com/x/web-interface/wbi/search/all/v2"
    const searchPageListApi2 = "//api.bilibili.com/x/web-interface/wbi/search/type"
    if (reqUrl.includes(searchPageListApi) || reqUrl.includes(searchPageListApi2)) {
      const res = await originFetch.apply(window, args);
      const cloneRes = res.clone();
      const rawData = await cloneRes.json();

      // console.log("劫持接口原始数据：", rawData);

      // pubdate 发布时间：秒
      // play 播放量
      // video_review 弹幕
      let resultItem;
      if (reqUrl.includes(searchPageListApi)) {
        resultItem = rawData?.data?.result?.filter((item: {
          result_type: string;
        }) => item.result_type === "video")?.[0];
      } else if (reqUrl.includes(searchPageListApi2)) {
        resultItem = {}
        resultItem.data = rawData?.data?.result
      }
      if (resultItem?.data) {
        // const total = resultItem.data.length;

        resultItem.data = resultItem.data.filter((item: { type: string; }) => item.type === "video");

        // const totalVideo = resultItem.data.length;
        // const totalAd = total - totalVideo;
        // const authorMap = new Map<string, number>();

        resultItem.data
          .sort((a, b) => b.play - a.play)
          .forEach((item: { author: string; typename: any; }) => {
            // const count = authorMap.get(item.author)
            // if (count && count > 0) {
            //   authorMap.set(item.author, count + 1);
            // } else {
            //   authorMap.set(item.author, 1);
            // }
            item.author += `（${item.typename}）`
          })

        // script?.dispatchEvent(
        //   new CustomEvent('from-bilibili-api-injected-script', {
        //     detail: {
        //       totalVideo,
        //       totalAd,
        //       authorMap
        //     },
        //   }),
        // );

        if (reqUrl.includes(searchPageListApi2)) {
          rawData.data.result = resultItem.data
        }

      }

      // 构造全新Response返回页面，必须原样复制status+headers，否则报错
      return new Response(JSON.stringify(rawData), {
        status: res.status,
        headers: res.headers,
      });
    }
    // 非目标接口直接放行
    return originFetch.apply(window, args);
  };


})






