---
title: '[Error]tailwindCSS의 문제와 질문 모음'
createdAt: "2024-07-01 15:25:47"
updatedAt: "2024-07-01 15:25:47"
discription: "tailwindCSS를 사용할 때 발생하는 문제나 질문들을 모아 해결방법을 기록"
tags: ['적용 안됨','tailwindCSS']
isFavorite: false
---
# 문제 & 질문
## 문제 & 질문 리스트
|문제|설명|
|--|--|
|code|tailwindCSS적용안됨|
## tailwindCSS적용안됨
### 문제직시
-  tailwind.config.ts에 설정되어 있지 않는 경로에서 tailwindCSS문법을 사용하려 시도하려 해 되지 않았다.
### 해결방안
- config의 content속성의 값에 해당하는 경로에 포함된 파일에서 tailwindCSS를 사용하려고 했는지 확인하고, 없다면 경로를 생성하거나, 기존에 설정되어있는 경로로 파일을 옮기면된다.
```ts
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
```