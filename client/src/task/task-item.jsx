import "./task-item.css"

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import Icon from "@mdi/react";
import { mdiPencilOutline, mdiClose } from "@mdi/js";

function TaskItem({
  item,
  setTaskItemFormData,
  setTaskItemDeleteDialog,
}) {
  let time = null;
  let day = null;

  if (item.time) {
    const parsedDate = new Date(item.time);
    if (!isNaN(parsedDate.getTime())) {
      time = parsedDate.toLocaleTimeString("cs-CZ", {
        hour: "2-digit",
        minute: "2-digit"
      });
      day = parsedDate.toLocaleDateString("cs-CZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    }
  }

  return (
      <Card id="card">
        <Card.Body>
          <div className="state"></div>
          <div style={{ position: "relative", margin: "0 0 0 52px" }}>
            <div className="name">{item.name}</div>
            {(time || day) && (
              <div>
                {time && <div className="time">{time}</div>}
                {day && <div className="day">{day}</div>}
              <br/>
              </div>
            )}
             {item.description && (
              <>
                <div>{item.description}</div>
              </>
            )}
            <div style={{ position: "absolute", top: "0", right: "0" }}>
              <Button
                className="border-0 p-1"
                variant="outline-primary"
                size="sm"
                onClick={() => setTaskItemFormData(item)}
              >
                <Icon path={mdiPencilOutline} size={0.8} />
              </Button>
              <Button
                className="border-0 p-1"
                variant="outline-danger"
                size="sm"
                onClick={() => setTaskItemDeleteDialog(item)}
              >
                <Icon path={mdiClose} size={0.8} />
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
  );
}

export default TaskItem;
