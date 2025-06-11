import TaskListProvider from "./task/task-list-provider";
import Routes from "./routes";

function App() {
  return (
    <body style={{ backgroundColor: "#b8cde6"}}>
        <TaskListProvider>
          <Routes/>
        </TaskListProvider>
    </body>
  );
}

export default App;
