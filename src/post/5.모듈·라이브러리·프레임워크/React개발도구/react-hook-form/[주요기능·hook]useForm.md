---
title: '[주요기능·hook]useForm'
createdAt: "2024-07-12 17:56:42"
updatedAt: "2024-07-12 17:56:42"
discription: "useForm의 옵션값과 반환값을 알아보고, 해당 값들이 어떤 의미와 역활을 가지는지 확인한다."
tags: ['input','form','react-hook-form','useform','검사','유효성']
isFavorite: false
---
# 사용 & 응용
## useForm의 기본 구조
|옵션|옵션값|설명|
|--|--|--|
|mode|onChange : 사용자가 폼을 입력하는 즉시 유효성 검사 </br> onBlur : 입력 필드가 포커스를 잃을때 유효성 검사 </br> onSubmit : 사용자가 폼을 제출할 때만 유효성 검사 </br> onTouched : 입력 필드가 포커스 된 후 모든 상황에서 유효성 검사 </br> all : 모든 상황에서 유효성 검사 </br>|동작을 제출하기 전에 검증하는 방법|123|

|반환값|설명|
|--|--|
|register|input요소를 react hook form과 연결시켜주고, 검증규칙을 적용할 수 있게 하는 메서드|
|formState|form state에 관한 정보를 담고 있는 객체|
|handleSubmit|form을 submit했을 때 실행할 함수로 Validation을 통과했을때 실행할 콜백함수(SubmitHandler)가 반드시 필요하다.실패했을때의 콜백함수(SubmitErrorhandler)는 옵셔널|
|setError|error관련 설정에 사용되는 함수|
## useForm 옵션 및 반환값에대한 추가설명
### [반환값]register
- `{...register("name")}의 역활`
  - register는 name, ref, onChange, onBlur를 props로 가지고있다.
  - 해당 props들을 input태그의 속성값으로 전달해주어야하는데 이를 번거롭지 않게 react-hook-form에서 제공하는 방법이다.
  ```jsx
  export default function TestUseForm() {
    const {register} = useForm();
    return (
      <>
        {/*{...register("name")} 미사용*/}
        <input
          type="text"
          id="name"
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
        />
        {/*{...register("name")} 사용*/}
        <input
          type="text"
          id="name"
          {...register("name")}
        />
      </>
    )
  }
  ```
- `유효성 검사`
  - react-hook-form은 총 6가지의 유효성 검사를 제공한다.
    |유효성|설명|value|
    |--|--|--|
    |required|비어있는 상태로 제출시 Error|boolean|
    |minLength & maxLangth|글자수가 value값기준 미만 or 초과인경우 Error|number|
    |min & max|입력한 숫자가 value값기준 미만 or 초과인 경우 Error|number|
    |pattern|value값에 전달된 정규표현식에 부합하는 패턴이 없을경우 Error|정규 표현식(Regex)|
- `유효성 검사 기본 사용법`
  - register의 두번째 인자로 유효성검사 데이터를 전달하면 된다.
  - 여러개의 유효성 검사도 가능하다.
  - 기본적으로 [key]:{value:data,message:data}형식으로 사용해야 하지만 required는 아래와 같은 방식으로 축약할 수 있다.
  ```js
  <input
    type="text"
    id="maxLength"
    {...register("maxLength", {
      required: "비어있는 상태로 제출할 수 없습니다.",
      maxLength: {
        value: 5,
        message: "5글자 초과인 상태로 제출할 수 없습니다.",
      },
    })}
  />
  ```
- `커스텀 유효성검사 함수 생성`
  - React-Hook-Form이 제공하는 유효성 검증 방법 말고 개발자가 직접 Validation을 만들 수 있다.
  ```js
  <input
    type="text"
    id="id"
    {...register("id", {
      required: "필수 입력란 입니다.",
      pattern: {
        value:
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: "이메일 형식이 아닙니다.",
      },
      validate: (fieldValue) => {
        return (
          fieldValue !== "test@naver.com" ||
          "test@naver.com는 사용할 수 없습니다."
        );
      },
    })}
  />
  ```
### [반환값]handleSubmit
- `기본 사용법`
  - handleSubmit안에는 사용자가 작성한 함수를 인자로 넣어주어야한다.
  ```ts
  interface IFormValues {
    name:string;
  }
  import { useForm } from "react-hook-form";
  export default function TestUseForm() {
    const {register,handleSubmit} = useForm({})
    const onSubmit = (data:FormValues) => {
      console.log(data)
      //inputValue === "name"일때 : {  name: name  }
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" id="name" {...register("name")}/>
        <button type='submit'>submit<button/>
      </form>
    )
  }
  ```
### [반환값]formState










```js
import  { useForm } from 'react-hook-form'
const Test = () => {
  const = {
    register,
    unregister,
    formState,
    watch,
    handleSubmit,
    reset,
    resetField,
    setError,
    clearErrors,
    setValue,
    setFocus,
    getValues,
    getFieldState,
    trigger,
    control,
    Form
  } useForm({
    mode:"onChange" | 
    defaultValues:{
      userName:"",
      id:"",
      password:"",
    }
  })
}
export default Test
```