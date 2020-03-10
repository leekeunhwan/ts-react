// 보통 인터페이스는 같은 파일에 안쓴다.
// type.ts로 만들어서 정의한다.
export interface TryInfo {
    try: string;
    result: string;
}

export interface INumberBaseballClassState {
    result: string;
    value: string;
    answer: number[];
    tries: TryInfo[];
}