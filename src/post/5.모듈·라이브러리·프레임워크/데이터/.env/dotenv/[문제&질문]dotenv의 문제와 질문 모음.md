---
title: '[문제&질문]dotenv의 문제와 질문 모음'
createdAt: "2024-07-01 15:33:29"
updatedAt: "2024-07-01 15:33:29"
discription: "dotenv를 사용할 때 발생하는 문제나 질문들을 모아 해결방법을 기록 "
tags: ['dotenv','환경변수','dotenv','process.env']
isFavorite: false
---
# 문제 & 질문
## 문제 & 질문 리스트
### 문제
|문제|설명|
|--|--|
|code|process.env를 통해 가져온 환경변수가 undefined를 반환한다.|
## process.env를 통해 가져온 환경변수가 undefined를 반환한다.
- dotenv를 잘 import했고, dotenv.config()를 선언하였는데도 process.env.DATA가 undefined를 반환하였다.
### 문제직시
- process.env를 통해 가져오는 환변경수를 별도의 파일로 만들어두고 해당 파일을 import 하는 과정에서 문제가 발생했다. 이유는 db_host를 import된 후에야 dotenv.config()메서드가 호출되었기 때문이다.
### 해결방안


# 질문
## process.env를 통해 가져온 환경변수가 undefined를 반환한다.
### 문제직시
- dotenv를 잘 import했고, dotenv.config()를 선언하였는데도 process.env.DATA가 undefined를 반환하였다. 
```js
// db.js
// index.js
import dotenv from "dotenv";
import { db_host } from "./db.js";
dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST); // DB_HOST: localhos
console.log({ db_host });                     // { db_host: undefined }
```
### 해결방안
- dotenv라이브러리의 import와 dotenv.config()메서드를 호출하는 코드를 별도의 파일로 뺀 후, 필요한 파일에 해당 별도로 뺀 파일을 import해주면 된다.
```js
// env.js
import dotenv from "dotenv";
dotenv.config();
// index.js
import "./env.js";
import { db_host} from "./db.js";
...
```

