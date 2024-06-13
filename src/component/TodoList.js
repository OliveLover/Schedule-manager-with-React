import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = ({ todo }) => {
  return (
    <div className="TodoList">
      <h4>Todo List 🌱</h4>
      <input className="searchbar" placeholder="검색어를 입력하세요." />
      <div className="list_wrapper">
        {todo.map((it) => (
          <TodoItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
