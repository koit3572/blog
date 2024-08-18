---
title: '[주요기능·파일구조]next.config.js'
createdAt: "2024-07-18 08:21:36"
updatedAt: "2024-07-18 08:21:36"
discription: "next.config.js에 설정할 수 있는 옵션들의 종류와 사용법을 기록"
tags: []
isFavorite: false
---
# 사전준비
## 추후 정리 필요
- url : https://velog.io/@ahuuae/nextconfigjs-redirects-rewrites#5-custom-webpack-config
# 사용 & 응용
## custom webpack config
- next.config.js파일에서 커스텀 웹팩을 설정하는 방법
- webpack함수에 대한 두번째 인수 객체
  |객체값|타입|설명|
  |--|--|--|
  |buildId|String|빌드 간의 고유 식별자로 사용되는 빌드 ID|
  |dev|Boolean|컴파일을 개발 중에 수행할지 여부를 나타내는 필드|
  |isServer|Boolean|서버 측 컴파일의 경우 true이고, 클라이언트 측 컴파일은 false로 적용|
  |nextRuntime|String \| undefined|서버 컴파일의 target 런타임. "edge" 또는 "nodejs"로 적용하고, 클라이언트 컴파일은 "undefined"로 적용|
  |defaultLoaders|Object| Next.js에서 내부적으로 사용하는 기본 로더babel(Object): 기본 babel-loader 구성|
- 아래는 html-webpack-plugin을 추가하는 코드이다.
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
   webpack: (config,{buildId,dev,isServer,nextRuntime,defaultLoaders})=>{
    return ({
      ...config,
      plugins: [
        config.plugins,
        new HtmlWebpackPlugin()
      ]
    })
   }
}
```