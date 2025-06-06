import { useContext } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";


import { TaskListContext } from "./task-list-provider.jsx";

function TaskItemForm({ item, onClose }) {
  const { taskListDto, handlerMap } = useContext(TaskListContext);
  const { state, data, error } = taskListDto || {};
  const [ time, setTime ] = useState(item?.time ? new Date(item.time) : null)

  return (
    <Modal show={true} onHide={onClose}>
      <Form
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
          if (item?.id) {
            result = await handlerMap.handleUpdate({
              id: item.id,
              ...values,
            });
          } else {
            result = await handlerMap.handleCreate({ ...values });
          }
          if (result.ok) {
            onClose();
          }
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{item?.id ? "Update" : "Add"} task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state === "error" ? (
            <Alert variant={"danger"}>{error.message}</Alert>
          ) : null}
          <Form.Label>Task name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            defaultValue={item?.name}
            disabled={state === "pending"}
            required
          />
          <Form.Label>Category</Form.Label>
          <Form.Select
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
          </Form.Select>
          <Form.Label>Time until</Form.Label> <br/>
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
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            defaultValue={item?.description}
            disabled={state === "pending"}
          />
        </Modal.Body>
        <Modal.Footer>
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
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TaskItemForm;
