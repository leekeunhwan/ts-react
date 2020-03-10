import * as React from "react";
import { useState, createRef, useCallback } from "react";
import Try from "./Try";
import { TryInfo } from "./types";

const getNumbers = () => {
  const candidates: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array: Array<number> = [];
  for (let i = 0; i < 4; i++) {
    const chosen: number = candidates.splice(
      Math.floor(Math.random() * (9 - i)),
      1
    )[0];
    array.push(chosen);
  }
  return array;
};

const NumberBaseball: React.FC = () => {
  const [answer, setAnswer] = useState(getNumbers());
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  // useState에서 빈배열을 사용하는 경우 타이핑 문제가 일어난다.
  // 이런 부분을 보통 인터페이스로 정의해서 쓰곤한다.
  const [tries, setTries] = useState<TryInfo[]>([]);
  const inputEl = createRef<HTMLInputElement>();

  const handleOnSubmit = useCallback<(e: React.FormEvent) => void>(
    e => {
      e.preventDefault();
      const input: HTMLInputElement | null = inputEl.current;
      if (value === answer.join("")) {
        setTries(prevTry => [
          ...prevTry,
          {
            try: value,
            result: "홈런!"
          }
        ]);
        setResult("홈런!");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
        if (input) {
          input.focus();
        }
      } else {
        const answerArray = value.split("").map(v => parseInt(v));
        let strike = 0;
        let ball = 0;
        if (tries.length >= 9) {
          setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다!`); // state set은 비동기
          alert("게임을 다시 시작합니다.");
          setValue("");
          setAnswer(getNumbers());
          setTries([]);
          if (input) {
            input.focus();
          }
        } else {
          for (let i = 0; i < 4; i += 1) {
            if (answerArray[i] === answer[i]) {
              console.log("strike", answerArray[i], answer[i]);
              strike += 1;
            } else if (answer.includes(answerArray[i])) {
              console.log(
                "ball",
                answerArray[i],
                answer.indexOf(answerArray[i])
              );
              ball += 1;
            }
          }
          setTries(prevTry => [
            ...prevTry,
            {
              try: value,
              result: `${strike} 스트라이크, ${ball} 볼입니다.`
            }
          ]);
          setValue("");
          if (input) {
            input.focus();
          }
        }
      }
    },
    [value, answer]
  );
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <div>숫자야구</div>
      <form onSubmit={handleOnSubmit}>
        <input
          ref={inputEl}
          maxLength={4}
          value={value}
          onChange={handleOnChange}
        />
        <button>입력</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => (
          <Try key={`${i}차 시도 : ${v.try}`} tryInfo={v} />
        ))}
      </ul>
    </>
  );
};

export default NumberBaseball;
