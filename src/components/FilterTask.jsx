import { Button, Space } from "antd";
import { FaTasks } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { MdOutlineDoneOutline } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterTask, updateDisplay } from "../features/task/taskSlice";

export const FilterTask = () => {
  const dispatch = useDispatch();
  const pendingTask = useSelector((state) => state.task.pendingTasks);
  const doneTask = useSelector((state) => state.task.doneTask);

  // function to disable filter button when editing
  const { editingState } = useSelector((state) => state.task.editing);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    editingState ? setDisabled(true) : setDisabled(false);
  }, [editingState]);

  // function to handle the filter and trigger a dispatch
  const handleFilter = (params) => {
    // trigger filtered tasks to global states
    dispatch(filterTask());

    // then trigger the display to be updated based on the status of the Global Display
    dispatch(updateDisplay(params));
  };

  // functions to check which button is active and style it accordinly
  const displayState = useSelector((state) => state.task.display);
  const doneBtn = useRef(null);
  const pendingBtn = useRef(null);
  const allBtn = useRef(null);

  // if (displayState === "all") {
  //   allBtn.current.
  // }

  return (
    <div className="flex justify-center">
      <Space.Compact>
        {/* button to filter pending tasks */}
        <Button
          ref={pendingBtn}
          size="small"
          type={displayState === "pending" ? "primary" : "dashed"}
          icon={<MdPendingActions />}
          disabled={disabled}
          onClick={() => handleFilter("pending")}
          className=""
        >
          Pending Tasks
        </Button>
        {/* button to filter done tasks */}
        <Button
          size="small"
          ref={doneBtn}
          type={displayState === "" ? "primary" : "dashed"}
          icon={<MdOutlineDoneOutline />}
          disabled={disabled}
          onClick={() => handleFilter("")}
          className=""
        >
          Done Tasks
        </Button>
        {/* Button to display all Tasks */}
        <Button
          size="small"
          ref={allBtn}
          type={displayState === "all" ? "primary" : "dashed"}
          icon={<FaTasks />}
          disabled={disabled}
          onClick={() => handleFilter("all")}
          className=""
        >
          All tasks
        </Button>
      </Space.Compact>
    </div>
  );
};
