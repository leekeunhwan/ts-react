import * as React from "react";
import { useState, useCallback, useRef } from "react";

const ResponsiveCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState<number[]>([]);
  // ref를 쓰는 이유가 state를 쓰면 state가 변경됨에 따라 화면 리렌더링이 일어나는데
  // ref의 경우 바뀌어도 화면이 리렌더링이 일어나지 않는다.
  // useRef는 3가지 타입이 있다.
  // 1. RefObject (read-only) : <T>
  // 2. MutableRefObject : <T | null>
  const timeout = useRef<number | null>(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  const onClickScreen = useCallback(() => {
    if (state === "waiting") {
      // overloading 발생 (useRef가 겹치는 것)
      // 또한 setTimeout이 NodeJS.Timeout으로 나온다.
      // 이런 경우 setTimeout앞에 window를 붙여주면
      // 브라우저의 환경의 setTimeout을 보게된다.
      timeout.current = window.setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
        startTime.current = new Date().getTime();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
      setState("ready");
      setMessage("초록색이 되면 클릭하세요.");
    } else if (state === "ready") {
      // 성급하게 클릭
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요.");
    } else if (state === "now") {
      // 반응속도 체크
      endTime.current = new Date().getTime();
      setState("waiting");
      setMessage("클릭해서 시작하세요.");
      setResult(prevResult => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  }, [state]);

  const onReset = useCallback(() => {
    setResult([]);
  }, []);

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균시간 : {result.reduce((a, b) => a + b) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponsiveCheck;
