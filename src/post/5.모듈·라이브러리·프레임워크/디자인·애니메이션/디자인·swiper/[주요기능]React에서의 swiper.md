---
title: '[주요기능]React에서의 swiper'
createdAt: "2024-06-28 14:55:17"
updatedAt: "2024-06-28 14:55:21"
discription: "swiper에서 지원하는 Swiper Element를 통해 swiper를 사용하는 방법에 대한 정리"
tags: ['swiper','react']
isFavorite: false
---



# 사전준비
## 추후 정리 필요
## 설치
```npm
npm install swiper
```


# 사용 & 응용
## 기본 코드
```jsx
// swiper 뼈대
import { Swiper,SwiperSlide } from 'swiper/react';
// swiper 특정 속성 필수 modules
import { Autoplay } from 'swiper/modules'
// swiper css
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const settings = {
  modules: [Autoplay, Pagination, Navigation],
  direction: "vertical"
  autoplay: { delay: 3000, disableOnInteraction: false },
  loop: true,
};
const App = () => {
  return (
    <Swiper {...settings}>
      <SwiperSlide>Swiper1</SwiperSlide>
      <SwiperSlide>Swiper2</SwiperSlide>
      <SwiperSlide>Swiper3</SwiperSlide>
      <SwiperSlide>Swiper4</SwiperSlide>
      <div className='swiper-pagination'></div>
      <div className='swiper-button-prev'></div>
      <div className='swiper-button-next'></div>
      <div className='swiper-scrollbar'></div>
    </Swiper>
  )
}
export default App
```
## Swiper Component 속성
### 기본 속성
- modules
  - 특정 속성들을 사용하기 위해서는 swiper/modules에서 추가적으로 import를 통해 가져와 사용해야하며, import한 모듈은 modules속성의 값으로 넣어주어야 적용이 된다.
  - |속성값|설명|
    |--|--|
    |Autoplay|자동재생을 위한 모듈 추가|
    |Pagination|페이지를 이동시키는 버튼을 추가하기 위한 모듈|
    |Navigation|페이지의 위치를 표현하는 요소를 추가하기 위한 모듈, 자식요소를 클릭하여 페이지 이동 또한 가능하다.|
### slidesPerView
한번에 보여질 슬라이더의 갯수를 정한다.
|속성값|설명|
|--|--|
|(number)|원하는 숫자를 적용시 해당 갯수만큼의 슬라이더가 보여진다.|
### direction
### loop
## 