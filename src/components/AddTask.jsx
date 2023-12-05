import { Button, Input, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, handlingEdit } from "../features/task/taskSlice";

export const AddTask = () => {
  // setting state and dispatch
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  // getting the tasksdescription to be edited to be edited
  const { editingState, editingDescription } = useSelector(
    (state) => state.task.editing
  );

  // state to set disabled button true or false
  const [disabled, setDisabled] = useState("block");

  useEffect(() => {
    editingState ? setValue(editingDescription) : setValue("");
    editingState ? setDisabled("none") : setDisabled("block");
    editingState && inputRef.current.focus();
  }, [editingState]);

  // function to handle the input value and set it to the value state
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  // function to handle submit button and dispatch it to the task Global state using the dispatch
  const handleSubmit = () => {
    if (/^\s*$/.test(value)) {
      return;
    }

    dispatch(addTask(value.trim()));
    setValue("");
  };

  // function to handle Edit input
  const handleEdit = () => {
    dispatch(handlingEdit(value));
  };

  return (
    <div>
      <Space.Compact
        style={{
          width: "400px",
        }}
      >
        <Input
          onChange={handleInput}
          value={value}
          ref={inputRef}
          placeholder="AddTask here"
          className="shadow-lg focus:bg-[#d9ffb6]"
        />
        <Button
          onClick={handleSubmit}
          type="primary"
          style={{ display: disabled }}
          // disabled={disabled}
          className="Border-2 shadow-lg"
        >
          Submit
        </Button>

        {editingState && (
          <Button
            onClick={handleEdit}
            type="primary"
            className="Border-2 shadow-lg"
          >
            Edit
          </Button>
        )}
      </Space.Compact>
    </div>
  );
};
