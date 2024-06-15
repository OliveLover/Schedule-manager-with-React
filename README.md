<h1>[할 일 관리] 앱 만들기</h1>

<h3>Learning Point</h3>
<ul>
  <li>UI 개발</li>
  <li>컴포넌트 나누기</li>
  <li>CRUD</li>
  <li>데이터 모델링</li>
  <li>목 데이터</li>
  <li>기능의 흐름</li>
  <li>기능의 완성도</li>
  <li>key, map, filter</li>
  <li>최적화</li>
  <li>메모이제이션</li>
  <li>useMemo</li>
  <li>횡단 관심사와 비즈니스 로직</li>
  <li>React.memo</li>
  <li>리렌더링 방지</li>
  <li>useCallback</li>
  <li>함수형 업데이트</li>
</ul>


<h2>1. Mac 환경에서 사전 준비</h2>

Mac에서 React 프로젝트를 생성합니다. node.js가 설치된 상태에서 아래의 코드를 터미널 창에 입력합니다.
```
$ sudo npx create-react-app .
```

코드 뒤에 <code> .</code> 은 현재의 디렉토리를 의미합니다.
Mac은 보안이 강하여 sudo를 붙여 관리자의 권한으로 실행 해주어야 합니다.

<code>git init</code> 이 안될 경우 아래의 순서대로 입력합니다.
```
$ whoamI
```

위의 코드를 입력하면 현재 PC의 사용자명 <code>($USER)</code>을 알 수 있습니다.

```
$ sudo chown -R { 사용자명 }:{ 그룹 } { 현재 디렉토리 절대 경로 }
```

그룹은 대표적으로 3가지가 있으며 이외에도 더 많은 그룹이 있습니다.
<ul>
  <li>staff</li>
  <li>admin</li>
  <li>root</li>
</ul>

이후 <code>git init</code>을 통해 git에 커밋할 수 있는 상태가 됩니다.

<h2>2. 요구사항 분석하기</h2>
<ul>
  <li>오늘의 날짜를 요일, 월, 일, 연도순으로 표시합니다.</li>
  <li>할 일(Todo)을 작성하는 입력 폼이 있고, <추가>버튼을 클릭하면 할 일 아이템을 생성합니다.</li>
  <li>[할 일 관리]앱은 생성한 아이템을 페이지 하단에 리스트로 표시하는데, 키워드 검색으로 원하는 일만 추출할 수 있습니다.</li>
  <li>리스트로 표시하는 낱낱의 할 일 아이템은 일을 마쳤는지 여부를 표시하는 체크박스, 아이템 이름, 등록 날짜, 그리고 <삭제> 버튼으로 이루어져 있습니다.</li>
</ul>

<h2>3. 리액트 훅</h2>
<p>리액트 훅(React Hook)이란 함수로 만든 리액트 컴포넌트에서 클랫로 만든 리액트 컴포넌트의 기능을 이용하도록 도와주는 함수들입니다.</p>
<p>리액트 훅은 <cod>useState</cod>, <code>useRef</code> 와 같이 함수의 모든 이름이 "use"로 시작합니다.</p>
<p>State 와 Ref 모두 원래는 함수로 만든 컴포넌트에서는 사용할 수 없는 기능이지만 이 훅 기능 덕분에 사용할 수 있습니다.</p>
<p>리액트 훅이라는 명칭은 마치 낚아채듯(Hook) 클래스로 만든 기능을 가져와 사용한다고 하여 붙여진 이름입니다.</p>

<h2>4. useState</h2>

```
[useState의 용법]
const [light, setLight] = useState('off');
```

<ul>
  <li><code>light</code> : State 변수</li>
  <li><code>setLight</code> : set 함수</li>
  <li><code>useState('off')</code> : 생성자(초깃값)</li>
</ul>

<p>useState를 호추하면 2개의 요소가 담긴 배열을 반환합니다. 이때 첫 번째 요소 light는 현재 상태의 값을 저장하고 있는 변수입니다.</p>
<p>이 변수를 "State 변수" 라고 부릅니다. 다음으로 두 번째 요소인 setLight는 State 변수의 값을 변경하는, 즉 상태를 업데이트하는 함수 입니다.</p>
<p>이 함수를 "set 함수"라고 부릅니다.</p>
<p>useState를 호출할 때 인수로 값을 전달하면 이 값이 State의 초깃값이 됩니다. 위 코드에서의 초깃값은 "off"가 됩니다.</p>

<h2>5. useRef</h2>

```
const ref = useRef(initialValue)
```

<ul>
  <li><code>initalValue</code> : ref객체의 현재 프로퍼티의 초기 설정값입니다. 이 값은 초기 렌더링 이후 무시됩니다.</li>
</ul>

<p><code>ref.current</code>는 프로퍼티를 변경해도 React는 컴포넌트를 다시 렌더링 하지 않습니다. <code>ref</code>는 일반 자바스크립트 객체이기 때문에 React는 사용자가 언제 변경했는지 알지 못합니다.</p>
<p><code>useRef()</code>는 <code>ref</code>로 값을 참조하거나 DOM을 직접 조작할 수 있으며, 콘텐츠 재생성을 피할때 사용할 수 있습니다.</p>

<h2>6. useEffect</h2>

```
[useEffect의 용법]
useEffect(callback, [deps])
```

<ul>
  <li><code>callback</code> : 콜백 함수</li>
  <li><code>[deps]</code> : 의존성 배열</li>
</ul>

<p><code>useEffect는 이 배열 요소의 값이 변경되면 첫 번째 인수로 전달한 콜백 함수를 실행합니다.</code></p>

<h3>컴포넌트의 마운트 시점에만 콜백함수 실행</h3>

```
useEffect(callback, [])
```

<p> 의존성 배열에 빈 배열을 전달하면 "마운트 시점"에만 콜백 함수를 실행합니다.</p>

<h2>7. useReducer</h2>

```
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

<p><code>useReducer</code>컴포넌트를 최상위에 호출하고, <code>reducer</code>를 이용해 <code>state</code> 관리합니다.</p>

```
import { useReducer } from 'react';

function reducer(state, action) {
  // ...
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  // ...
```

<ul>
  <li><code>reducer</code> : <code>state</code>가 어떻게 업데이트 되는지 지정하는 리듀서 함수 입니다. 리듀서 함수는 반드시 "순수 함수"여야 하며, <code>state</code>와 <code>action</code>을 인수로 받아야하고 하고, 다음 state를 반환해야합니다. </li>
  <li><code>initialArg</code> : 초기 <code>state</code>가 계산되는 값입니다.</li>
  <li>선택사항 <code>init</code> : 초기 <code>state</code>를 반환하는 초기화 함수입니다. 이 함수가 인수에 할당 되지 않으면, 초기 <code>state</code>는 <code>initialArg</code>로 설정됩니다. 할당되었다면 초기 <code>state</code> init(initialArg)를 호출한 결과가 할당됩니다.</li>
  <li><code>dispatch 함수</code> : <code>userReducer</code>에 의해 반환되는 <code>dispatch</code>함수는 <code>state</code>를 새로운 값으로 업데이트하고 리렌더링을 일으킵니다. <code>dispatch</code>의 유일한 인수는 <code>action</code> 입니다.</li>
  <li><code>action</code> : 사용자에 의해 수행됩니다. <code>action</code>은 일반적으로 <code>type</code>프로퍼티와 추가적인 정보를 표현하는 기타 프로퍼티로 포함한 객체로 구성됩니다.</li>
</ul>

<h2>8. 최적화와 메모이제이션</h2>
<p>리액트 앱에서 연산 최적화는 대부분 '메모이제이션(Memoization)' 기법을 이용합니다. '메모이제이션'의 의미는 '메모하는 방법'입니다. 메모이제이션은 특정 입력에 대한 결괏값을 제공해 빠르게 응답하는 기술입니다. 결과적으로 이 기법을 이용하면 불필요한 연산을 줄여 주어 프로그램의 실행 속도를 빠르게 만듭니다. 알고리즘을 공부하는 사람들은 이 기능을 동적 계획법(Dynamic Programming, DP)이라고 합니다.</p>
<p>리액트의 최적화 관련 기능으로는 <code>useMemo</code>가 있습니다. <code>useMemo</code>느 메모이제이션 기법을 이용해서 연산의 결괏값을 기억했다가 필요할 때 사용함으로써 불필요한 함수 호출을 막아주는 리액트 훅입니다.</p>

<h2>9. useMemo</h2>

```
[useMemo의 용법]
const value = useMemo(callback, deps);
```

<p><code>useMemo</code>를 호출하고 2개의 인수로 콜백 함수와 의존성 배열(deps)을 전달합니다. 호출된 <code>useMemo</code>는 의존성 배열에 담긴 값이 바뀌면 콜백 함수를 다시 실행하고 결괏값을 반화합니다. 예를 들어 다음과 같이 <code>useMemo</code>를 사용하면 의존성 배열 <code>count</code>의 값이 변할 때만 <code>count * count</code>를 계사해 <code>value</code>에 저장합니다.</p>

```
const value = useMemo(() => {
return count * count;
}, [count]);
```

<h2>10. React.memo</h2>

```
[React.memo의 용법]
const memoizedComp = React.memo(Comp);
```
<ul>
  <li><code>Comp</code> : 메모이제이션하려는 컴포넌트</li>
</ul>

<p><code>React.memo</code>는 인수로 전달한 컴포넌트를 메모이제이션된 컴포넌트로 만들어 반환합니다. 이때 <code>Props</code>가 메모이제이션의 기준이 됩니다. 즉, <code>React.memo</code>가 반환하는 컴포넌트는 부모 컴포넌트에서 전달된 <code>Props</code>가 변경되지 않는 한 리렌더 되지 않습니다. 컴포넌트가 크가 복잡할수록 불필요한 렌더링을 방지하면, 브라우저의 연산량을 줄여주어 성능 최적화에 도움이 됩니다.<code>React.memo</code>를 사용하는 방법은 단지 강화하고 싶은, 즉 메모이제이션을 적용하고 싶은 컴포넌트를 <code>React.memo</code>로 감싸면 됩니다.</p>

<h2>11. useCallback</h2>

```
[useCallback의 용법]
const memoizedFunc = useCallback(func, deps)
```

<ul>
  <li><code>func</code> : 콜백 함수</li>
  <li><code>deps</code> : 의존성 배열</li>
</ul>

<p><code>useCallback</code>은 컴포넌ㅌ가 리렌더될 때 내부에 내부에 작성된 함수를 다시 생성하지 않도록 메모이제이션하는 리액트 훅입니다.</p>
<p><cdoe>useCallback</cdoe>은 <code>useMemo</code>처럼 2개의 인수를 제공합니다. 첫 번째 인수로는 메모이제이션하려는 콜백 함수를 전달하고, 두 번째 인수로는 의존성 배열을 전달합니다.</p>
<p>결과로 <code>useCallback</code>은 메모이제이션된 함수를 반환합니다.</p>
<p><code>useCallback</code>은 의존성 배열에 담긴 값이 바뀌면 첫 번째 인수로 전달한 콜백 함수를 다시 만들어 반환합니다. 만약 첫 번째 인수로 전달한 콜백 함수를 어떤 경우에도 다시 생성하지 않게 하려면 의존성 배열을 빈 배열로 전달하면 됩니다.</p>
