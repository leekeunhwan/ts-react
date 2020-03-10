import * as React from "react";
import { TryInfo } from "./types";

// state는 useState가 대체하므로, 제네릭에서는 state 타이핑이 없다.
const Try: React.FC<{ tryInfo: TryInfo }> = ({ tryInfo }) => {
  return (
    <>
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    </>
  );
};

export default Try;
