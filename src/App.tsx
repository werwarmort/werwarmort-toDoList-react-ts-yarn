import React, { useState } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "RestAPI", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false },
  ]);

  const removeTask = (id: string) => {
    let filteredTasks = tasks.filter((t) => {
      return t.id !== id;
    });
    setTasks(filteredTasks);
  };

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todolists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodolist([...todolists]);
    }
  }

  let [todolists, setTodolist] = useState<Array<TodoListType>>([
    { id: v1(), title: "What to learn", filter: "all" },
    { id: v1(), title: "What to buy", filter: "active" },
  ]);

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    let copy = [...tasks];
    setTasks(copy);
  }

  return (
    <div className="App">
      {todolists.map((tl) => {
        let taskForTodoList = tasks;
        if (tl.filter === "completed") {
          taskForTodoList = tasks.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          taskForTodoList = tasks.filter((t) => t.isDone === false);
        }

        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={taskForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
