// exModuleInterop을 true로 놓고 써도 되지만 (모듈시스템 이해하고 쓰는거면 괜찮은데..)
// *(애스터리스크) as를 써서 사용하는 것이 좋다고 한다.

import * as React from "react";
import * as ReactDOM from "react-dom";

import GuGuDan from "./GuGuDan";
import GuGuDanClass from "./GuGuDanClass";
import WordRelay from "./WordRelay";
import WordRelayClass from "./WordRelayClass";

ReactDOM.render(<WordRelayClass />, document.querySelector("#root"));
