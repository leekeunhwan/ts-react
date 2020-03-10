import * as React from "react";
import { Component } from "react";
import { TryInfo } from "./types";

export default class TryClass extends Component<{ tryInfo: TryInfo }> {
  render() {
    const { tryInfo } = this.props;
    return (
      <>
        <li>
          <div>{tryInfo.try}</div>
          <div>{tryInfo.result}</div>
        </li>
      </>
    );
  }
}
