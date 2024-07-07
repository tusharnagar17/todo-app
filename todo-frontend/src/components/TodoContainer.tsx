"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Todo } from "@/types/types";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { MdOutlineClose } from "react-icons/md";
import { DeleteTodo, GetTodo, PostTodo, PutTodo } from "@/services/api";
import Image from "next/image";

const TodoContainer = () => {
  const [task, setTask] = useState<Todo[] | undefined>(undefined);
  const [item, setItem] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  // frontend
  // function
  // backend
  // upload
  // readme update

  async function fetchTask() {
    const data = await GetTodo();
    if (Array.isArray(data)) {
      setTask(data);
    }
    console.log("Fetch task data", Array.isArray(data));
  }

  useEffect(() => {
    fetchTask();
  }, []);

  const AddTask = async () => {
    console.log(item);
    const latestTime = new Date().getTime();
    if (task && task.length !== undefined) {
      await PostTodo({
        id: Math.floor(Math.random() * 1000),
        name: item,
        status: false,
        date: latestTime.toString(),
      });
    } else {
      console.error("Task or task.length is undefined or null");
    }
    setItem("");
    fetchTask();
  };

  const DeleteTask = async (id: number) => {
    console.log("delete task clicked");
    await DeleteTodo(id);
    fetchTask();
  };
  const ToggleTask = async (id: number) => {
    console.log("task id", id);

    await PutTodo(id);
    fetchTask();
  };
  return (
    <div
      className="border-2 bg-white border-black max-w-6xl 
          h-auto md:w-[35vw] mx-auto p-4 rounded-xl"
    >
      <div className="flex items-center gap-5 justify-center text-5xl font-bold text-center my-4">
        To-Do List{" "}
        <Image src={"/notes.png"} height={50} width={50} alt="notes-" />
      </div>
      <div className="flex relative">
        <input
          type="text"
          name="task"
          className="w-full border-2 rounded-full px-4 py-2"
          value={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
        />
        <button
          onClick={AddTask}
          className="bg-orange-500 text-white absolute right-0 mx-auto font-bold px-4 rounded-full py-2"
        >
          Add
        </button>
      </div>
      <div>
        {task &&
          task.map((item: Todo, ind: number) => {
            return (
              <div
                key={ind}
                className={`flex justify-start gap-10 px-4 py-4 my-2 items-center relative border-2 rounded-full  h-10 ${
                  item.status ? "bg-blue-200" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.status}
                  onChange={() => ToggleTask(item.id)}
                />
                <div
                  onClick={() => ToggleTask(item.id)}
                  className={`
                    text-lg my-10
                    ${
                      item.status
                        ? "line-through cursor-pointer"
                        : "cursor-pointer"
                    }
                `}
                >
                  {item.name}
                </div>
                <button
                  onClick={() => DeleteTask(item.id)}
                  className="absolute right-10"
                >
                  <MdOutlineClose />
                </button>
              </div>
            );
          })}
        {!task && (
          <div className="text-xl font-bold flex items-center justify-center my-10">
            No tasks!
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoContainer;
