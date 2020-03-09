import * as React from "react";
import { useState, useRef, useCallback } from "react";

const WordRelay = () => {
  const [word, setWord] = useState("초밥");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);

  // useCallback의 두번쨰 파라미터인 배열안에
  // 요소를 넣어주면 넣어준 요소가 바뀌었을때만
  // 함수 생성이 된다.
  const handleSubmitForm = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const input = inputEl.current;
      if (word[word.length - 1] === value[0]) {
        setResult("정답입니다!");
        setWord(value);
        setValue("");
        if (input) {
          input.focus();
        }
      } else {
        setResult("오답입니다!");
        setValue("");
        if (input) {
          input.focus();
        }
      }
    },
    [word, value]
  );
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
    },
    []
  );

  return (
    <>
      <div>끝말잇기!</div>
      <div>{word}</div>
      <form onSubmit={handleSubmitForm}>
        <input
          ref={inputEl}
          type="text"
          value={value}
          // 인라인형식으로 쓰면 매개변수가 자동추론 되어 명시하지 않아도 된다.
          onChange={handleOnChange}
        />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRelay;
