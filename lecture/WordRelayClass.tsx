import * as React from "react";
import { Component, createRef } from "react";

interface IState {
  word: string;
  value: string;
  result: string;
}

class WordRelayClass extends Component<{}, IState> {
  state = {
    word: "초밥",
    value: "",
    result: ""
  };

  input: HTMLInputElement | null = null;

  onRefInput = createRef<HTMLInputElement>();

  handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { word, value } = this.state;
    const input = this.onRefInput.current;
    if (word[word.length - 1] === value[0]) {
      this.setState({
        result: "정답입니다!",
        word: value,
        value: ""
      });
      if (input) {
        input.focus();
      }
    } else {
      this.setState({
        result: "오답입니다!",
        value: ""
      });
      if (input) {
        input.focus();
      }
    }
  };

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.currentTarget.value
    });
  };

  render() {
    const { word, value, result } = this.state;
    return (
      <>
        <div>끝말잇기!</div>
        <div>{word}</div>
        <form onSubmit={this.handleSubmitForm}>
          <input
            ref={this.onRefInput}
            type="text"
            value={value}
            // 인라인형식으로 쓰면 매개변수가 자동추론 되어 명시하지 않아도 된다.
            onChange={this.handleOnChange}
          />
          <button>입력!</button>
        </form>
        <div>{result}</div>
      </>
    );
  }
}

export default WordRelayClass;
