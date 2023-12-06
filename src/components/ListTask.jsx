import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "./Task";
import { filterTask } from "../features/task/taskSlice";

export const ListTask = () => {
  const dispatch = useDispatch();

  // destructor all my global tasks state
  const { allTasks, pendingTasks, doneTasks, display, triggerDisplay } =
    useSelector((state) => state.task);

  // set the present task to display based on the status of display in the global state
  const [tasksToDisplay, setTasksToDisplay] = useState([]);

  //Hook o check render the conent based on which of the button was cliccked, whther pending or done
  useEffect(() => {
    if (display === "all") {
      setTasksToDisplay(allTasks);
    } else if (display === "pending") {
      setTasksToDisplay(pendingTasks.tasks);
    } else {
      setTasksToDisplay(doneTasks.tasks);
    }
  }, [display, allTasks]);

  return (
    <div className="max-h-[300px] scrollbar-thin scrollbar-thumb-[#00b96b] scrollbar-track-[#d9ffb6]  scroll-smooth overflow-scroll overflow-x-hidden">
      {/* mapping through task from the main state  */}
      {tasksToDisplay.map((item) => {
        return <Task key={item?.id} {...item} />;
      })}
    </div>
  );
};
