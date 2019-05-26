module.exports = {
  appid: "wx3cd1e2e648b722a2",
  appsecret: "635a95fd860efb33f7f67b4eb90b9e48",
  token: "hddhyq",
  domain: "http://www.brokenbones.xyz",
  menu: {
    button: [
      {
        type: "click",
        name: "今日歌曲",
        key: "V1001_TODAY_MUSIC"
      },
      {
        name: "菜单",
        sub_button: [
          {
            type: "view",
            name: "搜索",
            url: "http://www.soso.com/"
          },
          {
            type: "click",
            name: "赞一下我们",
            key: "V1001_GOOD"
          }
        ]
      },
      {
        type: "view",
        name: "blog",
        url: "https://hddhyq.github.io/"
      }
    ]
  }
};
