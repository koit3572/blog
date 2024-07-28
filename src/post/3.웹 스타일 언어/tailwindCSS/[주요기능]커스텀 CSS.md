---
title: '[주요기능]커스텀 CSS'
createdAt: "2024-06-27 13:13:15"
updatedAt: "2024-06-27 13:13:15"
discription: "tailwindCSS의 기본적으로 설정되어있는 CSS가 아닌 사용자가 원하는 스타일을 설계하고 사용하는 방법에 대한 정리 "
tags: ['tailwindCSS','커스텀','사용자 지정','custom','plugin','플러그인','애니메이션','animation']
isFavorite: false
---

# 사용 & 응용
## 커스텀 CSS 추가하기
```js
const config: Config = {
  theme: {
    extend: {
      textShadow: {
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        sm: "0 1px 2px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
        border:
          "-1px 0 var(--tw-shadow-color), 0 1px var(--tw-shadow-color), 1px 0 var(--tw-shadow-color), 0 -1px var(--tw-shadow-color)",
      },
      textBorder: {
        DEFAULT: "0.1rem black",
      },
    },
  },
};
export default config
```
## 커스텀 CSS 사용하기
- var(--tw-shadow-color)는 추후 스타일로 들어오는 색상값을 가지게 됨
- tailwind.config.js를 통해 미리 지정해준 값을 사용하기에 조금 제한된 사용이 됨
```jsx
<div className='text-shadow shadow-white'></div>
```
```css
{  text-shadow: 0 2px 4px white;  }
```
## 커스텀 PlugIn 추가하기
- tailwind에 새 스타일을 css가 아닌 js로 추가하는 방식이다.
```js
const config: Config = {
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
export default config
```
## 커스텀 PlugIn 사용하기
- 커스텀 CSS보다 더 자유로운 스타일이 가능해짐
- 값(var)으로 전달되는 값에 띄어쓰기를 사용해야 한다면 "_"를 통해 표현하면 된다.
```jsx
<div className='text-shadow-[0_8px_16px_red]'></div>
```
```css
{  text-shadow: 0 2px 4px red;  }
```
## 커스텀 Animation 추가하기
- keyframes을 통해 동작을 적용하고, animation을 통해 동작에대한 세부 옵션을 추가한다.
```js
const config: Config = {
  theme:{
    keyframes: {
      spin: {
        form: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
    animation: {
      spin1: "spin1 25s infinite linear",
    },
  }
};
export default config
```
## 커스텀 Animation 사용하기