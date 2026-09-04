export default defineUnlistedScript(() => {
  console.log('Hello from the main world');

  // 劫持 fetch
  const originFetch = window.fetch;
  window.fetch = async function (...args) {
    const [input] = args;
    const reqUrl = typeof input === "string" ? input : ("url" in input ? input.url : null);

    // console.log("reqUrl", reqUrl);
    if(!reqUrl) return originFetch.apply(window, args);

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
    if (reqUrl.includes(searchPageListApi)) {
      const res = await originFetch.apply(window, args);
      const cloneRes = res.clone();
      const rawData = await cloneRes.json();

      console.log("劫持接口原始数据：", rawData);
      // data.result[11].data[0].pubdate
      //
      // pubdate 发布时间：秒
      // play 播放量
      // video_review 弹幕
      let data: [] = rawData?.data?.result?.filter((item: { result_type: string; }) => item.result_type === "video")?.[0]?.data ?? [];
      if(!data?.length) return originFetch.apply(window, args);
      data.forEach((item) => {
        item.author += `(${item.typename})`
      })

      console.log(data)
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






