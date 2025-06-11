import "./dashboard.css"

import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/esm/Container";
import CategoryItem from "../category/category-item";
import DashboardContent from "./dashboard-content";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="navBar">
        <Container>
          <h1>Dasboard</h1>
          <button onClick={() => navigate("taskItemForm")} >Create task</button>
        </Container>
      </div>
      <CategoryItem/>
      <Container>
        <DashboardContent />
      </Container>
    </>
  );
}

export default Dashboard;
