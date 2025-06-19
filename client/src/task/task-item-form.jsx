import "./task-item-form.css"

import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

import { useNavigate } from "react-router-dom";
import { TaskListContext } from "./task-list-provider.jsx";

function TaskItemForm({ onClose }) {
  const location = useLocation();
  const item = location.state?.item;

  const { taskListDto, handlerMap } = useContext(TaskListContext);
  const { state, data, error } = taskListDto || {};
  const [ time, setTime ] = useState(item?.time ? new Date(item.time) : null)

  const navigate = useNavigate()

  console.log("TaskItemForm")
  return (
    <>
      <div className="navBar">
        <div className="container">
          <h1>{item?.id ? "Update" : "Create"} Task</h1>
          <button className="close-button" onClick={() => navigate("/")} >
            <Icon path={mdiClose} size={1.2} />
          </button>
        </div>
      </div>
      <div className="container">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const formData = new FormData(e.target);
            const values = Object.fromEntries(formData);

            if (time instanceof Date && !isNaN(time)) {
              values.time = time.toISOString();
            } else {
              delete values.time;
            }

            let result;
            console.log("Form submission result:", result);
            if (item?.id) {
              result = await handlerMap.handleUpdate({
                id: item.id,
                ...values,
              });
            } else {
              result = await handlerMap.handleCreate({ ...values });
            }
            if (result.ok) {
              navigate("/");
            }
          }}
        >
            {state === "error" ? (
              <Alert variant={"danger"}>{error.message}</Alert>
            ) : null}
            <label>Task name *</label>
            <input
              type="text"
              name="name"
              defaultValue={item?.name}
              disabled={state === "pending"}
              required
            /><br/>
            <label>Category *</label>
            <select
              type="select"
              name="categoryId"
              defaultValue={item?.categoryId}
              disabled={state === "pending"}
              required
            >
              {data?.categoryMap
                ? Object.keys(data.categoryMap).map((categoryId) => {
                    return (
                      <option key={categoryId} value={categoryId}>
                        {data.categoryMap[categoryId].name}
                      </option>
                    );
                  })
                : null}
            </select> <br/>
            <label>Time until</label>
            <DatePicker
              selected={time}
              onChange={(date) => setTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="HH:mm - dd. MM. yyyy"
              className="form-control"
              name="time"
            /> <br/>
            <label>Description</label>
            <input
              type="text"
              name="description"
              defaultValue={item?.description}
              disabled={state === "pending"}
            /> <br/>
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={state === "pending"}
            >
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={state === "pending"}
            >
              Save Changes
            </Button>
        </form>
      </div>
    </>
  );
}

export default TaskItemForm;
