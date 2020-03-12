// exModuleInterop을 true로 놓고 써도 되지만 (모듈시스템 이해하고 쓰는거면 괜찮은데..)
// *(애스터리스크) as를 써서 사용하는 것이 좋다고 한다.

import * as React from "react";
import * as ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";

import GuGuDan from "./GuGuDan";
import GuGuDanClass from "./GuGuDanClass";
import WordRelay from "./WordRelay";
import WordRelayClass from "./WordRelayClass";
import NumberBaseball from "./NumberBaseball";
import NumberBaseballClass from "./NumberBaseballClass";
import ResponsiveCheck from "./ResponsiveCheck";
import ResponsiveCheckClass from "./ResponsiveCheckClass";
import Lotto from "./Lotto";
import LottoClass from "./LottoClass";
import RSP from "./RSP";

const Hot = hot(LottoClass);

ReactDOM.render(<Hot />, document.querySelector("#root"));
