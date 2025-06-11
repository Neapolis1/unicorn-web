import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout";
import Dashboard from "./task/dashboard";
import TaskItemForm from "./task/task-item-form";

function MyRoutes() {
  return (
    <div style={{ backgroundColor: "#b8cde6"}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/taskItemForm" element={<TaskItemForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default MyRoutes;