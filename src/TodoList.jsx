import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleUp,
  faCircleDown,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";

function TodoList() {
  const [todoList, setTodo] = useState(["Wash clothes", "Clean the room"]);

  const [task, setNewTask] = useState("");

  function handleAddTodo(event) {
    const todo = document.getElementById("todoValue").value;
    if (todo != "") {
      setTodo((prevTodo) => [...prevTodo, todo]);
      document.getElementById("todoValue").value = "";
    } else {
      alert("Error. Empty data fied.");
    }
  }

  function handleAddingTheTodo() {}

  function handleEnterPressedTodo(event) {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  }

  function handleDeleteTodo(index) {
    setTodo((prevTodo) => prevTodo.filter((_, i) => i != index));
  }

  function handleTodoMove(index, direction) {
    if (direction === "up") {
      const updatedTodo = [...todoList];

      if (index - 1 >= 0) {
        [updatedTodo[index], updatedTodo[index - 1]] = [
          updatedTodo[index - 1],
          updatedTodo[index],
        ];

        //updatedTodo[index] = updatedTodo[index - 1];
        //updatedTodo[index - 1] = temp;

        setTodo(updatedTodo);
        const listItems = document.querySelectorAll(".todo-list ul li");
        listItems[index].classList.add("move-up");

        setTimeout(() => {
          listItems[index].classList.remove("move-up");
        }, 300);
      } else {
        alert("Error. No todo item above");
      }
    } else {
      const updatedTodo = [...todoList];

      if (index + 1 < todoList.length && todoList[index + 1] != "") {
        [updatedTodo[index], updatedTodo[index + 1]] = [
          updatedTodo[index + 1],
          updatedTodo[index],
        ];
        setTodo(updatedTodo);

        const listItems = document.querySelectorAll(".todo-list ul li");
        listItems[index].classList.add("move-down");

        setTimeout(() => {
          listItems[index].classList.remove("move-down");
        }, 500);
      } else {
        alert("Error. No todo item below");
      }
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="todo-title">TodoList</h1>
        <div className="form-field">
          <input
            type="text"
            placeholder="Enter todo"
            id="todoValue"
            onKeyDown={handleEnterPressedTodo}
          />
          <button onClick={(event) => handleAddTodo(event)}>ADD</button>
        </div>
      </div>

      <div className="todo-list">
        <ul>
          {todoList.map((todo, index) => (
            <li key={index}>
              {index + 1} . {todo}
              <div>
                <FontAwesomeIcon
                  icon={faCircleUp}
                  className="arrow arrow-up"
                  onClick={() => handleTodoMove(index, "up")}
                />
                <FontAwesomeIcon
                  icon={faCircleDown}
                  className="arrow arrow-down"
                  onClick={() => handleTodoMove(index, "down")}
                />
                <FontAwesomeIcon
                  onClick={() => handleDeleteTodo(index)}
                  icon={faRectangleXmark}
                  className="arrow arrow-close"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoList;
