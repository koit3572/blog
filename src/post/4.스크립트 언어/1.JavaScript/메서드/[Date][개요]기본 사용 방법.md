---
title: '[Date][개요]기본 사용 방법'
createdAt: "2024-07-06 10:06:45"
updatedAt: "2024-07-06 10:06:45"
discription: "JavaScript의 기본 메서드의 Date를 통해 날짜와 시간을 비교하는 방법"
tags: ['date','시간','날짜','javascript','js','몇분 전']
isFavorite: false
---



# 사전준비
## 설치
- date는 JavaScript의 기본 메서드 이기에 별도의 설치가 필요 없다.



# 사용 & 응용
## 기본 메서드
### 연,월,일,시,분,초, 구하는 메서드
```js
const date = new Date("2024-07-06 10:25:45");

const year = date.getFullYear();    // 2024
const month = date.getMonth() + 1;  // 7
const date = date.getDate();        // 6
const hours = date.getHours();      // 10
const mins = date.getMinutes();     // 25
const sec = date.getSeconds();      // 45
```
### Date.getTime()
- getTime은 1970년 1월 1일 0시 0분 0초 이후로부터 지금까지 흐른 시간을 ms로 반환한다.
- 시간의 기준은 UTC임으로 한국은 UTC+9임으로 1970년1월1일9시로 시간을 설정하고 getTime을 적용하면 0이 나온다.
```js
const date = new Date("1970-01-01 09:00:00").getTime()
console.log(date) // 0
```
## 비교
### 비교 연산자를 통한 비교
- 비교연산자를 통해 두개의 Date객체의 크기를 비교할 수 있다.
- 더 크다는 의미는 다른객체보다 시간상으로 미래에 있다는것을 의미한다.
- 주의
  - Date객체는 == 또는 ===로 크기를 비교할 수 없다.
  - 동등 연산자는 항상 false을 반환한다.
```js
const date1 = new Date('2022-05-04'); 
const date2 = new Date('2022-05-05'); 
console.log(date1 > date2);     // false
console.log(date1 >= date2);    // false
console.log(date1 < date2);     // true
console.log(date1 <= date2);    // true
```
### Date.getTime()을 통한 비교
- getTime의 자세한 설명은 사용·메서드·Date.getTime에서 확인
```js
const date1 = new Date('2022-05-04'); 
const date2 = new Date('2022-05-05'); 
console.log(date1.getTime() > date2.getTime());   // false
console.log(date1.getTime() >= date2.getTime());  // false
console.log(date1.getTime() < date2.getTime());   // true
console.log(date1.getTime() <= date2.getTime());  // true
console.log(date1.getTime() == date2.getTime());  // false
```
### 같은 날짜(년/월/일)인지 비교
```ts
const getIsSameDate = (date1:Date,date2:Date):boolean => {
  const isSameDate = 
    date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth() 
    && date1.getDate() === date2.getDate();
  return isSameDate
}
```
### 날짜/시간이 모두 동일한지 비교
```ts
const getIsSameDateAndTime = (date1:Date,date2:Date):boolean => {
  const isSameDateAndTime = date1.getTime() === date2.getTime(); 
  return isSameDAteAndTime
}
```
## 변환
### 몇년전, 몇달전, 몇주전, 몇일전, 몇시간전, 몇분전, 방금전으로 변환
```ts
const getElapsedTime = (date:Date) => {
  const startTime = date.getTime()
  const endTime = new Date().getTime();
  
  const seconds = Math.floor((endTime - startTime) / 1000);
  if (seconds < 60) { return '방금 전' };
  const minutes = seconds / 60;
  if (minutes < 60) { return `${Math.floor(minutes)}분 전` };
  const hours = minutes / 60;
  if (hours < 24) { return `${Math.floor(hours)}시간 전` };
  const days = hours / 24;
  if (days < 7) { return `${Math.floor(days)}일 전` };
  const weeks = days / 7;
  if (days/7 < 5) { return `${Math.floor(days/7)}주 전` };
  const months = days / 30;
  if (days/30 < 12) {
    return `${Math.floor(days/30)}달 전`
  } else {
    return `${Math.floor(days/365)}년 전`
  };
}
```