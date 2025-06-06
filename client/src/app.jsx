import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./app.css";
import Layout from "./layout";
import Dashboard from "./task/dashboard";
import TaskListProvider from "./task/task-list-provider";

function App() {
  return (
    <body style={{ backgroundColor: "#b8cde6"}}>
      <TaskListProvider>
        <Layout/>
        <Dashboard/>
      </TaskListProvider>
    </body>
  );
}

export default App;
