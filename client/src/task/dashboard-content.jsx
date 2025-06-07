import { useContext, useState } from "react";

import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import { TaskListContext } from "./task-list-provider";
import PendingItem from "./pending-item";
import TaskItem from "./task-item"
import TaskItemDeleteDialog from "./task-item-delete-dialog";
import TaskItemForm from "./task-item-form";

function DashboardContent() {
  const [taskItemFormData, setTaskItemFormData] = useState();
  const [taskItemDeleteDialog, setTaskItemDeleteDialog] = useState();
  const { taskListDto } = useContext(TaskListContext);
  const { state, data, error } = taskListDto || {};

  return (
    <Card className="border-0 "  style={{ backgroundColor: "#fff0" }}>
      <Card.Body className="px-0" style={{ position: "relative" }}>
        {!!taskItemFormData ? (
          <TaskItemForm
            item={taskItemFormData}
            onClose={() => setTaskItemFormData()}
          />
        ) : null}
        {!!taskItemDeleteDialog ? (
          <TaskItemDeleteDialog
            item={taskItemDeleteDialog}
            onClose={() => setTaskItemDeleteDialog()}
          />
        ) : null}
        {state === "error" ? (
            <Alert variant={"danger"}>{error.message}</Alert>
          ) : null}
        {state === "pending" && !data
          ? [0, 1, 2, 3].map((item) => <PendingItem key={item} />)
          : null}
        {state === "ready" &&
          Array.isArray(data?.itemList) &&
          data.itemList.length > 0 ? (
            data.itemList
              .filter((item) => item.state === "ongoing")
              .map((item) => (
                <TaskItem
                  key={item.id}
                  item={item}
                  setTaskItemFormData={setTaskItemFormData}
                  setTaskItemDeleteDialog={setTaskItemDeleteDialog}
                />
              ))
          ) : null}
      </Card.Body>
    </Card>
    
  );
}

export default DashboardContent;
