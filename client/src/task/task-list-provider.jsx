import { createContext, useState, useEffect } from "react";

import FetchHelper from "../fetch-helper.js";

export const TaskListContext = createContext();

function TaskListProvider({ children }) {
  const [taskListDto, setTaskListDto] = useState({
    state: "ready", // one of ready/pending/error
    data: null,
    error: null,
  });

  const [selectedCategory, setSelectedCategory] = useState("none");

  async function handleLoad() {
    setTaskListDto((current) => {
      return { ...current, data: undefined, state: "pending" };
    });

    const safeDtoIn = selectedCategory === "none" ? {} : { categoryId: selectedCategory };

    // Tohle vynutí JSON serializovatelný čistý objekt
    const dtoIn = JSON.parse(JSON.stringify(safeDtoIn));

    try {
      const result = await FetchHelper.task.list(dtoIn);

      setTaskListDto((current) => {
        if (result.ok) {
          return { ...current, state: "ready", data: result.data, error: null };
        } else {
          return { ...current, state: "error", error: result.data };
        }
      });
    } catch (e) {
      setTaskListDto((current) => ({
        ...current,
        state: "error",
        error: e,
      }));
    }
  }
  
  /* eslint-disable */
  useEffect(() => {
    handleLoad();
  }, [selectedCategory]);
  /* eslint-enable */

  async function handleCreate(dtoIn) {
    setTaskListDto((current) => {
      return { ...current, state: "pending" };
    });
    const result = await FetchHelper.task.create(dtoIn);
    setTaskListDto((current) => {
      if (result.ok) {
        current.data.itemList.push(result.data);
        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  async function handleUpdate(dtoIn) {
    setTaskListDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.task.update(dtoIn);
    setTaskListDto((current) => {
      if (result.ok) {
        const itemIndex = current.data.itemList.findIndex(
          (item) => item.id === dtoIn.id
        );
        current.data.itemList[itemIndex] = dtoIn;
        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
          pendingId: undefined,
        };
      } else {
        return {
          ...current,
          state: "error",
          error: result.data,
          pendingId: undefined,
        };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  async function handleDelete(dtoIn) {
    setTaskListDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.task.delete(dtoIn);
    setTaskListDto((current) => {
      if (result.ok) {
        const itemIndex = current.data.itemList.findIndex(
          (item) => item.id === dtoIn.id
        );
        current.data.itemList.splice(itemIndex, 1);
        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  const value = {
    taskListDto,
    selectedCategory,
    setSelectedCategory,
    handlerMap: { handleLoad, handleCreate, handleUpdate, handleDelete },
  };

  return (
    <TaskListContext.Provider value={value}>
      {children}
    </TaskListContext.Provider>
  );
}

export default TaskListProvider;
