import "./dashboard.css"

import { useNavigate } from "react-router-dom";

import CategoryItem from "../category/category-item";
import DashboardContent from "./dashboard-content";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="navBar">
        <div className="container">
          <h1>Dasboard</h1>
          <button className="button" onClick={() => navigate("taskItemForm")} >Create task</button>
        </div>
      </div>
      <CategoryItem/>
      <div className="container">
        <DashboardContent />
      </div>
    </>
  );
}

export default Dashboard;
