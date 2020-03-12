import * as React from "react";
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import Ball from "./Ball";

function getWinNumbers() {
  // js에서는 fill()만해도 empty가 들어가지만, ts에서는 null이라 넣어줘야한다.
  const candidate = Array(45)
    .fill(null)
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  // 훅스는 타입추론 안되면 제네릭으로 해결하면 쉽게 해결할 수 있다. (정의 문서 보고 제네릭 선언)
  // hook 컴포넌트는 매번 실행된다.
  // 이렇게 아래처럼 하면 공하나를 뽑을때마다 당첨번호를 새로 뽑는 불상사가 생길수 있다.
  // const lottoNumbers = getWinNumbers();
  // useMemo도 타입핑(타입추론)이 잘안되면 제네릭 추가해주기
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  // 빈배열은 TS에서 위험하다. 그래서 꼭 배열안의 타입도 명시해줘야함
  // TS에서 빈배열은 Never임
  const [winBalls, setWinBalls] = useState<number[]>([]);
  const [bonus, setBonus] = useState<number | null>(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    console.log("useEffect");
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = window.setTimeout(() => {
        setWinBalls(prevBalls => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = window.setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeouts.current.forEach(v => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

  useEffect(() => {
    console.log("로또 숫자를 생성합니다.");
  }, [winNumbers]);

  const onClickRedo = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log("onClickRedo");
      console.log(winNumbers);
      // 초기화
      setWinNumbers(getWinNumbers());
      setWinBalls([]);
      setBonus(null);
      setRedo(false);
      timeouts.current = [];
    },
    [winNumbers]
  );

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map(v => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lotto;
