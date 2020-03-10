import * as React from "react";
import { Component, createRef } from "react";

interface IState {
  state: "waiting" | "now" | "ready";
  message: string;
  result: number[];
}

class ResponsiveCheckClass extends Component<{}, IState> {
  // 클래스에서 클래스프로퍼티 문법을 이용하면,
  // 인터페이스가 state에 작용 안된다.
  // contructor에서 this.state를 하면 IState 제네릭쓴 것이 적용됨
  state: IState = {
    state: "waiting",
    message: "클릭해서 시작하세요.",
    result: []
  };

  timeout: number | null = null;
  startTime: number | null = null;
  endTime: number | null = null;

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === "waiting") {
      // overloading 발생 (useRef가 겹치는 것)
      // 또한 setTimeout이 NodeJS.Timeout으로 나온다.
      // 이런 경우 setTimeout앞에 window를 붙여주면
      // 브라우저의 환경의 setTimeout을 보게된다.
      this.timeout = window.setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭"
        });
        this.startTime = new Date().getTime();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤

      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요."
      });
    } else if (state === "ready") {
      // 성급하게 클릭
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.setState({
        state: "waiting",
        message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요."
      });
    } else if (state === "now") {
      // 반응속도 체크
      this.endTime = new Date().getTime();
      this.setState(prevState => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요.",
          // this.endTime처럼 null이 100% 아니고 if를 쓸수없으면 !를 뒤에 붙여주면 된다.
          result: [...prevState.result, this.endTime! - this.startTime!]
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: []
    });
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>평균시간 : {result.reduce((a, b) => a + b) / result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>
    );
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponsiveCheckClass;
