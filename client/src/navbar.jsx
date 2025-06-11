import Container from "react-bootstrap/esm/Container";
import "./navbar.css"

import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate()
  return (
    <>
      <div className="toDoList">
        <Container>
          <button onClick={() => navigate("/")}>ToDoList</button>
        </Container>
      </div>
    </>
  );
}

export default NavBar;
