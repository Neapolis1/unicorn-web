import "./navbar.css"

import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate()
  return (
    <>
      <div className="toDoList">
        <div className="container">
          <button onClick={() => navigate("/")}>ToDoList</button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
