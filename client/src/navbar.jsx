import Container from "react-bootstrap/esm/Container";
import "./navbar.css"

import { useEffect, useState, useContext } from "react";

import TaskItemForm from "./task/task-item-form";
import CategoryItem from "./category/category-item";

import { TaskListContext } from "./task/task-list-provider";

function NavBar() {
  const { state } = useContext(TaskListContext);
  const [taskItemFormData, setTaskItemFormData] = useState();

  return (
    <header>
      <div className="toDoList">
        <Container>
          <h1>ToDoList</h1>
        </Container>
      </div>
      <div className="navBar">
      {!!taskItemFormData ? (
        <TaskItemForm
          item={taskItemFormData}
          onClose={() => setTaskItemFormData()}
        />
      ) : null}
        <Container>
          <h1>Dasboard</h1>
          <button
            disabled={state === "pending"}
            onClick={() => setTaskItemFormData({})}
          >Create task</button>
        </Container>
      </div>
      <CategoryItem/>
    </header>
  );
}

export default NavBar;
