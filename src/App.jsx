import { ConfigProvider } from "antd";
import "./App.css";
import { AddTask } from "./components/AddTask";
import { FilterTask } from "./components/FilterTask";
import { ListTask } from "./components/ListTask";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
          algorithm: true, // Enable algorithm
          colorBgContainer: "#f6ffed",
        },
      }}
    >
      <div className="grid place-content-center h-screen">
        <h1 className="drop-shadow-lg text-center">Todo Checklist</h1>
        <div className="flex flex-col min-h-[400px] bg-white rounded-lg gap-10 shadow-lg">
          {/* add task Component */}
          <AddTask />
          <FilterTask />
          <ListTask />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
