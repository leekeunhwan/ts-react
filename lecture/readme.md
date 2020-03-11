## 공부하고 느낀 점

<구구단>

1. 먼저 자바스크립트 코딩을 하고 나서 타입을 입히면서 타입 세이프티를 챙기는 것이 보기에도 하기에도 좋은 것 같다.

2. 훅스보다 클래스를 썼던 시절에 주로 리액트를 해서 그런지 훅스가 낯설긴 하지만 보다 직관적인 부분이 있다.

3. 생각보다 Go To Definition과 호버신공을 이용하면 타입을 찾는게 스트레스 받지 않는 것 같다.

4. 그리고 코드 이쁘게 보이기보다 가급적 에러없는 코드를 작성하는 것이 보다 좋은 것 같다.

<끝말잇기>

1. useCallback의 첫번째 인자는 생성할 함수, 두번째 인자는 값이 바뀌면 다시 함수를 생성할 대상을 넣어주면 된다.<br>

2. useCallback을 쓰는 것은 성능 최적화에 좋다. 첫번째 인자에 넣은 함수를 메모이제이션하여 변환하고,<br>
   이 함수는 오직 의존하는 상태의 값(두번째 배열안에 들어있는 값들)이 변경된 경우에만 갱신된다.<br>

3. ref는 createRef()로 할 수도 있고, ref를 넘겨서 주입하는 방법도 있다.<br>

4. if(input)을 input!이라고 사용할 수 있는데, 보다 확실한 에러 방지가 좋다. (코드가 이쁘지 않더라할지라도..)<br>

<숫자야구>

1. useState에서 빈배열을 쓰는 경우 타이핑 문제가 발생한다.<br>
   이 경우 type 혹은 interface를 구현하여 `useState<IExample>([])`과 같이 제네릭을 써준 후 빈배열을 쓰도록 한다.<br>

2. React.FC의 경우 state는 useState가 대체하므로, 제네릭에서는 state 타이핑이 없다. Props만 써준다.<br>

<반응속도체크>

1. useRef()의 경우 타입이 여러개 존재하고, 쓰고자하는 것이 read-only인지 mutatable인지 파악하여 맞게 제네릭을 넣어주도록 하자<br>
   => `RefObject (read-only) : <T>` , `MutableRefObject : <T | null>`<br>

2. class의 경우 State 인터페이스를 쓰게 되면, contructor안에 this.state형식으로 쓰던가,<br>
   state 프로퍼티 문법을 쓰게되면 state:StateInterface = {} 이렇게 써주도록 하자<br>

3. setTimeout의 경우 NodeJS.timeout인지 window 환경인지 파악해야 한다.<br>

4. possibly null일 수도 있다고 에러뜨면 if(target)으로 안전하게 막거나 여의치 않을 경우 target!으로 해결해준다. (100% null이 아닌경우에만!!)

<가위바위보>

1. as const라는 키워드를 이용하면 read-only화 시킬 수 있다.

2. type 키워드를 통해 별칭을 지을 수 있다. (인터페이스와 유사, 유니온 타입으로 지정해도 됨)

3. typeof를 이용하면 (자바스크립트 typeof와 다름..) 객체의 value를 유니온 타입화 해놓은 결과를 얻을 수 있다.

4. keyof typeof를 이용하면, value를 뽑고, value에 맞는 key를 뽑아서 결과적으로 key를 유니온 타입화 해놓은 결과를 얻을 수 있다.

5. 가급적 유니온타입을 직접쓰기보다는 수정을 하는 부분을 최소화 할 수 있도록 타입화 하여 쓰는게 좋다.
