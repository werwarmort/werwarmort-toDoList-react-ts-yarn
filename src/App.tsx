import React, { useState } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "RestAPI", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false },
  ]);
  let [filter, setFilter] = useState<FilterValuesType>("all");

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

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let taskForTodoList = tasks;
  if (filter === "completed") {
    taskForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    taskForTodoList = tasks.filter((t) => t.isDone === false);
  }

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
      <TodoList
        title="What to learn"
        tasks={taskForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
