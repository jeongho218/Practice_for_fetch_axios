// 서버에 데이트를 요청하는 방법
// 1. 기본 제공하는 API를 사용하는 방법 - fetch
// 2. 라이브러리를 사용하는 방법 - axios

import { useEffect, useState } from "react";

function App() {
  const [todoList, setTodoList] = useState(null);

  const fetchData = () => {
    fetch("http://localhost:4000/api/todo")
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const text = event.target.text.value;
    const done = event.target.done.checked;
    fetch("http://localhost:4000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        done,
      }),
    }).then(() => fetchData());
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={onSubmitHandler}>
        <input name="text" />
        <input name="done" type="checkbox" />
        <input type="submit" value="추가" />
      </form>
      {todoList?.map(
        (
          todo // '?'은 옵셔널 체이닝이다.
        ) => (
          // todoList가 null 또는 undefined인 경우 아무 작업도 수행하지 않고 건너 뛴다.
          // 즉, {todoList}를 렌더링을 하지 않는다.
          <div key={todo.id}>
            <div>{todo.id}</div>
            <div>{todo.text}</div>
            <div>{todo.done ? "Y" : "N"}</div>
          </div>
        )
      )}
    </div>
  );
}

export default App;
