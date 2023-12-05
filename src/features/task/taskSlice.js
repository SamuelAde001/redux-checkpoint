import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

// Declaring initial state
const initialState = {
  allTasks: JSON.parse(localStorage.getItem("tasks")) || [],

  pendingTasks: {
    tasks: [],
  },
  doneTasks: {
    tasks: [],
  },
  display: "all",

  editing: {
    editingState: false,
    editingDescription: "",
    editingID: "",
  },
};

// JSON.parse(localStorage.getItem("tasks")) || [];

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    // action to add a task to the initial State of the task
    addTask: (state, action) => {
      state.allTasks.push({
        description: action.payload,
        id: nanoid(),
        isDone: false,
        highlighted: false,
      });
      localStorage.setItem("tasks", JSON.stringify(state.allTasks));
    },

    // action to update the status of Item status
    updateTaskStatus: (state, action) => {
      state.allTasks = state.allTasks.map((item) => {
        if (item.id === action.payload) {
          item.isDone = !item.isDone;
        }
        return item;
      });

      //  save updated tasks status to local storage
      localStorage.setItem("tasks", JSON.stringify(state.allTasks));
    },

    // action to trigger toggle thtrough the various Global disp[lay state]
    updateDisplay: (state, action) => {
      state.display = action.payload;
    },

    // action to filter the task into the various global states
    filterTask: (state, action) => {
      const done = state.allTasks.filter((item) => item.isDone === true);
      const notDone = state.allTasks.filter((item) => item.isDone === false);
      state.pendingTasks.tasks = notDone;
      state.doneTasks.tasks = done;
    },

    // action to get the tasks description to be updated
    ediingTasksState: (state, action) => {
      // destructure the items in action payload object
      const { id, description } = action.payload;

      // map through all tasks and anyone whose id is equal to the id of the element clicked, change the global state of editing to be equal to the description of the item clicked
      state.allTasks.map((item) => {
        if (item.id === id) {
          state.editing.editingDescription = description;
          state.editing.editingState = true;
          state.editing.editingID = item.id;
          item.highlighted = true;
        }
        localStorage.setItem("tasks", JSON.stringify(state.allTasks));
      });
    },

    // state to sumbit edited task
    handlingEdit: (state, action) => {
      state.allTasks.map((item) => {
        if (item.id === state.editing.editingID) {
          item.description = action.payload;
          item.highlighted = false;
        }
      });
      state.editing.editingDescription = "";
      state.editing.editingState = false;
      state.editing.editingID = "";

      //  save updated tasks status to local storage
      localStorage.setItem("tasks", JSON.stringify(state.allTasks));
    },

    // ACTION TO DELETE A TASK
    deleteTask: (state, action) => {
      state.allTasks = state.allTasks.filter((item) => {
        return item.id !== action.payload;
      });
      state.editing.editingDescription = "";
      state.editing.editingState = false;
      state.editing.editingID = "";
      //  save updated tasks status to local storage
      localStorage.setItem("tasks", JSON.stringify(state.allTasks));
    },
  },
});

// exporting actions
export const {
  addTask,
  updateTaskStatus,
  filterTask,
  updateDisplay,
  ediingTasksState,
  handlingEdit,
  deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;
