# 0.使用方法

```bash
$ yarn
$ yarn start
```



目前这个版本的一些问题，希望能集合社群的开发力量一起看下：

1. 移动端不适配，不知道是 3D-force-graph 的问题还是样式问题
2. 目前是纯前端部署，是否要通过 AWS 或者其他传统后端方式，做一些接口的请求？
3. React 直接处理近 10W 条数据，加载很慢
4. 其他更有利于社群建设的展示逻辑探索
5. 加入 Web3/ Wallet 元素
6. 增加搜索功能





记录下开发历程：我是算法转前端的，初期要学 JS，React，CSS 这些之前没接触的东西，痛苦嗷

1. 初次接触：@licheng 转了 [**3d-force-graph**](https://github.com/vasturiano/3d-force-graph) 的🔗，希望达成星图的效果
2. 研究Notion 接口，发现只能 fetch 100 条数据 (处理各种 Notion 奇怪的数据流)
3. …洗数据，做标签匹配，制作 Json，
4. 1 成开发，9 成 Debug
5. 学 Mobx 做 Store 管理；加多选组件
6. Deploy by Vercel





# 1.引入 Tailwind

依照官网 : https://www.tailwindcss.cn/docs/guides/create-react-app

```bash
$ npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@latest autoprefixer@latest
$ npx tailwindcss-cli@latest init

+ purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],...

/* ./src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

+ import './index.css';
```

> `npm install @craco/craco `  因为和 cra 版本冲突 , 不写也行



# 2.回滚 Commit

开发分支别害怕

随时你可以回滚他



# 3.引入 Mui

```sh
npm install @mui/material @emotion/react @emotion/styled
```





----



# Old Readme

## partner-visualize

706 partners visualized from react-force-graph

##  0. Resource

参考代码 : 

https://github.com/vasturiano/react-force-graph/tree/master/example

https://codesandbox.io/s/angry-kowalevski-igtdjd?file=/src/data.json



## 1. 运行

```
npm install
npm start
```



## 2. 数据 json 说明

- `data_.json`  : 706 Notion `伙伴` 数据库
- `data.json` : 测试数据
- `notion_url_mapping.json`  Notion URL 对应 Mapping 表



## 3. 开发路径

Notion API : https://developers.notion.com/

一开始想 fetch Notion 的接口 API 来获取数据库内容, 但是经过测试 , 只能获取 100 条 , 所以最终走向了手动导出 -> 痛苦清洗的不归路



## 4. 优化方向

1. 能否利用 Notion API 的 cursor 实现多次调取, 绕开最大 100 条的限制?
2. 在页面中增加搜索功能
3. 在页面中增加筛选功能
4. 在页面中增加悬浮显示 "个人介绍" 功能



