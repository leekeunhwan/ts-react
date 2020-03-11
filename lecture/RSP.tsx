import * as React from "react";
import { useState, useRef, useEffect } from "react";

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px"
} as const;
// as const를 붙이면 read-only가 된다.

const scores = {
  가위: 1,
  바위: 0,
  보: -1
} as const;

// typeof는 value들을 유니온 타입으로 뽑아준다.
// keyof는 key들을 유니온 타입으로 뽑아준다.
// 혼자쓰면 안되고 keyof typeof 이렇게 써줘야함
type ImgCoords = typeof rspCoords[keyof typeof rspCoords];
const computerChoice = (imgCoords: ImgCoords) => {
  // Object.key의 한계가 무조건 string[]이라서
  // as를 이용하여 강제 형변환을 해줘야한다.
  // 타입스크립트의 한계가 undefined가 될수도 있다고 타입이 들어가는 경우가 있는데
  // 확신을 갖고 있을 때는 !를 붙여서 undefined가 안나오도록 해줘야한다.
  return (Object.keys(rspCoords) as ["가위", "바위", "보"]).find(k => {
    return rspCoords[k] === imgCoords;
  })!;
};

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState<ImgCoords>(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef<number>();

  // useEffect는 타입스크립트 타이핑할 것 크게 없다.
  useEffect(() => {
    // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
    console.log("다시 실행");
    interval.current = window.setInterval(changeHand, 100);
    return () => {
      // componentWillUnmount 역할
      console.log("종료");
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  // 인자를 담는 경우 () => 함수명(args)이렇게 쓰는데
  // 리렌더링이 걱정되어 onClick={함수명(args)}라고 쓰고자 한다면
  // const 함수명 = (args) => () => {...} 이렇게 작성해주면 된다.
  const onClickBtn = (choice: keyof typeof rspCoords) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다!");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다!");
      setScore(prevScore => prevScore + 1);
    } else {
      setResult("졌습니다!");
      setScore(prevScore => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = window.setInterval(changeHand, 100);
    }, 1000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`
        }}
      />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RSP;
