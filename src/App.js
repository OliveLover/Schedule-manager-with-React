import { useReducer, useRef } from "react";
import "./App.css";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    createDate: new Date().getTime(),
  },
];

function reducer(state, action) {
  return state;
}

function App() {
  const idRef = useRef(3);
  const [todo, disPatch] = useReducer(reducer, mockTodo);

  const onCreate = (content) => {
    idRef.current += 1;
  };

  const onUpdate = (targetId) => {};

  const onDelete = (targetId) => {};

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
