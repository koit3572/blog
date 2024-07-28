---
title: '[주요기능]플러그인(PlugIn)'
createdAt: "2024-06-22 11:02:25"
updatedAt: "2024-06-22 11:02:28"
discription: "tailwindCSS의 플러그인을 가져와 프로젝트에 적용하는 방법에 대한 기록"
tags: ['tailwindCSS','플러그인','plugin','tailwind-scrollbar-hide']
isFavorite: false
---
# 사전준비
## post에 대하여
- 해당 post는 여러 플러그인을 가져와 사용하는 방법을 서술함으로 예시가 되는 하나의 플러그인(tailwind-scrollbar-hide)을 통해서 사용방법에 대해 서술할 것이다.
## tailwindCSS플러그인 리스트
|이름|설명|
|--|--|
|tailwind-scrollbar-hide|스크롤바를 숨기는 속성을 추가하는 플러그인|
## 설치
- 필요에 의한 플러그인을 터미널 명령어를 통해 설치한다.<br/>
```npm
$ npm install tailwind-scrollbar-hide
```

# 사용 & 응용
## 설치한 플러그인을 tailwind.config.js에 적용
- config의 plugins속성에 다음과 같이 전달한다.
```js
const config = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  //...
  plugins: [require("tailwind-scrollbar-hide")],
}
```
## Component에서 적용한 플러그인 사용하기
- 기본 tailwindCSS의 속성에서는 scrollbar-hide이 없지만 플러그인을 적용한 후에는 다음과 같이 사용이 가능해진다.
```jsx
const Home = () => {
  return (
    <div className='scrollbar-hide'>
      {...내용}
    </div>
  )
}
```