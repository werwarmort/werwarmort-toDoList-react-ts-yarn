import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
// change
type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (newTaskTitle.trim() !== "" && e.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? "error" : ""}
        />
        <button className="addBtn" onClick={addTask}>
          <p className="p_addBtn">add</p>
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul className="todosSection">
        {props.tasks.map((t) => {
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked);
          };
          return (
            <li className={t.isDone ? "is-done" : ""} key={t.id}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <span>{t.title}</span>
              <button
                className="removeBtn"
                onClick={() => {
                  props.removeTask(t.id);
                }}
              ></button>
            </li>
          );
        })}
      </ul>
      <div className="controlPanel">
        <button
          className={`controlBtn ${
            props.filter === "all" ? "active-filter" : ""
          }`}
          onClick={() => {
            props.changeFilter("all");
          }}
        >
          All
        </button>

        <button
          className={`controlBtn ${
            props.filter === "active" ? "active-filter" : ""
          }`}
          onClick={() => {
            props.changeFilter("active");
          }}
        >
          Active
        </button>

        <button
          className={`controlBtn ${
            props.filter === "completed" ? "active-filter" : ""
          }`}
          onClick={() => {
            props.changeFilter("completed");
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
