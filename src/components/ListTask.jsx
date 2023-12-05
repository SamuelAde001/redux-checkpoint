import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Task } from "./Task";

export const ListTask = () => {
  // destructor all my global tasks state
  const { allTasks, pendingTasks, doneTasks, display } = useSelector(
    (state) => state.task
  );

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
    <div>
      {/* mapping through task from the main state  */}
      {tasksToDisplay.map((item) => {
        return <Task key={item?.id} {...item} />;
      })}
    </div>
  );
};
