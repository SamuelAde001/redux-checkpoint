import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  ediingTasksState,
  filterTask,
  updateTaskStatus,
} from "../features/task/taskSlice";
import { Button, Checkbox } from "antd";
import { DeleteOutlined, DeleteTwoTone, EditOutlined } from "@ant-design/icons";

export const Task = ({ description, isDone, id, highlighted }) => {
  // use Selector to find the state of editing
  const { editingState } = useSelector((state) => state.task.editing);

  const dispatch = useDispatch();
  const handleChecked = () => {
    dispatch(updateTaskStatus(id));
    dispatch(filterTask());
  };

  // edit function

  const editTaskItems = {
    id: id,
    description: description,
  };
  const editTask = () => {
    if (!editingState) {
      dispatch(ediingTasksState(editTaskItems));
    }
  };

  // Delete the task function
  const handleDeleteTask = () => {
    dispatch(deleteTask(id));
  };
  return (
    <div
      className="flex justify-between p-2 shadow border-2 border-black "
      style={{ backgroundColor: highlighted && "#d9ffb6" }}
    >
      <Checkbox onChange={handleChecked} checked={isDone}>
        {description}
      </Checkbox>
      <span className="space-x-3">
        <Button
          type="primary"
          size="small"
          icon={<EditOutlined />}
          onClick={editTask}
        />
        <Button
          type="primary"
          size="small"
          icon={<DeleteOutlined />}
          onClick={handleDeleteTask}
        />
      </span>
    </div>
  );
};
