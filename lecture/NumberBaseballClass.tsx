import * as React from "react";
import { Component, createRef } from "react";
import { INumberBaseballClassState } from "./types";
import TryClass from "./TryClass";

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

class NumberBaseballClass extends Component<{}, INumberBaseballClassState> {
  // interface와 순서 일치시켜주기
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [] // push 쓰면 안됨
  };

  handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { value, answer, tries } = this.state;
    const input: HTMLInputElement | null = this.inputEl.current;
    if (value === answer.join("")) {
      this.setState(prevState => {
        return {
          tries: [...prevState.tries, { try: value, result: "홈런!" }],
          result: "홈런!",
          value: "",
          answer: getNumbers()
        };
      });

      if (input) {
        input.focus();
      }
    } else {
      const answerArray = value.split("").map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다!`,
          value: "",
          answer: getNumbers(),
          tries: []
        });
        alert("게임을 다시 시작합니다.");
        if (input) {
          input.focus();
        }
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            console.log("strike", answerArray[i], answer[i]);
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            console.log("ball", answerArray[i], answer.indexOf(answerArray[i]));
            ball += 1;
          }
        }
        this.setState(prevState => {
          return {
            tries: [
              ...prevState.tries,
              {
                try: value,
                result: `${strike} 스트라이크, ${ball} 볼입니다.`
              }
            ],
            value: ""
          };
        });

        if (input) {
          input.focus();
        }
      }
    }
  };

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value
    });
  };

  inputEl = createRef<HTMLInputElement>();

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.handleOnSubmit}>
          <input
            ref={this.inputEl}
            type="text"
            maxLength={4}
            value={value}
            onChange={this.handleOnChange}
          />
          <button>입력</button>
        </form>
        <div>시도: {tries.length}</div>
        <ul>
          {tries.map((v, i) => (
            <TryClass key={`${i}차 시도`} tryInfo={v} />
          ))}
        </ul>
      </>
    );
  }
}

export default NumberBaseballClass;
