import * as React from "react";

interface IState {
  first: number;
  second: number;
  value: string;
  result: string;
}

// P = Props (when empty {})
// S = State (when empty {})
class GuGuDanClass extends React.Component<{}, IState> {
  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: "",
    result: ""
  };

  handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { value, first, second } = this.state;
    if (parseInt(value) === first * second) {
      // 정답을 맞췄으면
      this.setState({
        result: `정답! : ${value}`,
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: ""
      });
      if (this.input) {
        this.input.focus();
      }
    } else {
      // 정답을 못맞췄으면
      this.setState({
        result: "오답입니다.",
        value: ""
      });
      // input!은 if (input)과 비슷한 의미의 코드이지만
      // 아주 작은 확률이라도 버그가 날 수 있기에
      // 가급적 if (input)을 하는 것이 좋다.
      this.input!.focus();
    }
  };

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  input: HTMLInputElement | null = null;

  onRefInput = (ref: HTMLInputElement) => {
    this.input = ref;
  };

  render() {
    const { first, second, result, value } = this.state;
    return (
      <>
        <div>
          {first} 곱하기 {second}는?
        </div>
        <form onSubmit={this.handleSubmitForm}>
          <input
            ref={this.onRefInput}
            type="number"
            value={value}
            // 인라인형식으로 쓰면 매개변수가 자동추론 되어 명시하지 않아도 된다.
            onChange={this.handleOnChange}
          />
        </form>
        <div>{result}</div>
      </>
    );
  }
}

export default GuGuDanClass;
