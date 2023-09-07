"use client"
import { useContext, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import TodoContext from "@/Context/TodoContext";
import { toast } from "react-hot-toast";


const AddTodo: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const context = useContext(TodoContext)
  const setShouldRefetch = context.setShouldRefetch

  const handleOnClickAddTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/todo/add", {
      id: nanoid(),
      title: todo,
      isCompleted: false,
      createdAt: new Date,
    })
      .then(async (response) => {
        setTodo("");
        setShouldRefetch(true)
      })
      .catch((error) => {
        toast.error("Something went wrong.")
      });
  }

  return (
    <div>
      <label htmlFor="price" className="block text-md font-semibold leading-6 text-gray-900">
        Add Todo
      </label>
      <div className="mt-2 rounded-md shadow-sm flex">
        <input
          type="text"
          name="price"
          id="price"
          className="block w-5/6 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-4"
          placeholder="Title"
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
        />
        <button className='bg-indigo-800 w-1/6 rounded-md text-white font-semibold p-2 hover:bg-indigo-700' onClick={handleOnClickAddTodo}>Add</button>
      </div>
    </div>
  );
};

export default AddTodo;
