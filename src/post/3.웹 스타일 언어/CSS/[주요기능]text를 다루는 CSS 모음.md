---
createdAt: "2024-08-25 00:05:40"
description: "앞으로 자주 사용하게 될것으로 예상되는것, 혹은 그러한 style을 하나의 component로 정리해 두었다."
tags: ["style", "스타일", "말 줄임표", "..."]
isFavorite: false
---

# 사용 & 응용

## 리스트

| 제목                                      | 설명                                                                                |
| ----------------------------------------- | ----------------------------------------------------------------------------------- |
| 요소 안 내용 줄바꿈 금지 & 말 줄임표(...) | 택스트박스가 부모요소의 너비를 넘어갈 시 넘어간 부분을 지우고 ...으로 처리하는 방법 |

## 요소 안 내용 줄바꿈 금지 & 말 줄임표(...)

### 한 줄에서 적용

```css
.ellipsis {
  white-space: nowrap; /* 줄바꿈 금지*/
  overflow: hidden; /* ellipsis요소를 벗어나는 자식요소를 숨김처리 */
  text-overflow: ellipsis; /* 말줄임표(...)추가*/
}
```

### 여러 줄에서 적용

```css
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```
