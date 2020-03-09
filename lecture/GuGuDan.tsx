// 왠만하면 클래스보다 훅스를 쓰는게 좋다.
// 페이스북 측에서도 권고하고 있기 때문에, 가급적 훅스가 좋다.
// 클래스는 이제 레거시 코드로..

// 타입스크립트가 숙달되지 않았을 때는 자바스크립트로 먼저 코딩한 후 타입체킹해도 된다.
// 타입 정의해서 찾기 힘들면 어느정도는 호버해서 타입을 알아낼 수 있다.

import * as React from "react";
import { useState, useRef } from "react";

const GuGuDan = () => {
  // 훅스들이 스스로 타입추론이 되면 좋지만 안되면 제네릭을 쓴다.
  const [first, setFirst] = useState<number>(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  // 타입추론이 안되면 제네릭을 넣어줄수 있다.
  const inputEl = useRef<HTMLInputElement>(null);

  // 이렇게 함수를 빼서 사용할 때에는 이벤트에 대한 타입을 명시해야한다.
  // 보통은 이렇게 사용한다.
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputEl.current;
    if (parseInt(value) === first * second) {
      // 정답을 맞췄으면
      setResult("정답!");
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue("");
      if (input) {
        input.focus();
      }
    } else {
      // 정답을 못맞췄으면
      setResult("오답입니다.");
      setValue("");
      // input!은 if (input)과 비슷한 의미의 코드이지만
      // 아주 작은 확률이라도 버그가 날 수 있기에
      // 가급적 if (input)을 하는 것이 좋다.
      input!.focus();
    }
  };

  return (
    <>
      <div>
        {first} 곱하기 {second}는?
      </div>
      <form onSubmit={handleSubmitForm}>
        <input
          ref={inputEl}
          type="number"
          value={value}
          // 인라인형식으로 쓰면 매개변수가 자동추론 되어 명시하지 않아도 된다.
          onChange={e => setValue(e.target.value)}
        />
      </form>
      <div>{result}</div>
    </>
  );
};

export default GuGuDan;
