---
title: '[개요]기본 사용 방법'
createdAt: "2024-06-28 15:34:55"
updatedAt: "2024-06-28 15:34:55"
discription: "gsap을 통한 애니메이션 적용 시 딱딱한 움직임을 보이게 된다. 이를 해결하기 위한 gsap.to의 속성인 esae을 사용하는 방법을 정리"
tags: ['자연스러움','딱딱함','애니메이션','esae']
isFavorite: false
---
# 사전준비
- gsap의 홈페이지에 접속하여 Core, Extra, ClubGSAP를 통해 그래프를 보고 esae을 복사하여 가져오면 된다.
```js
import { gsap } from 'gsap'
const floating = document.queryselector('.floating')
gsap.to(floating,{
  esae:"Power1.easeInOut"
})
```