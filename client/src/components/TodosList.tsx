"use client"
import TodoContext from "@/Context/TodoContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import dateFormat from "dateformat";
import EditTodoButton from "./EditTodoButton";
import DeleteTodoButton from "./DeleteTodoButton";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";

interface ITodosListProps { }

const TodosList: React.FunctionComponent<ITodosListProps> = () => {
    const context = useContext(TodoContext);
    const shouldRefetch = context.shouldRefetch;
    const setShouldRefetch = context.setShouldRefetch;
    const pathname = usePathname();
    const [todos, setTodos] = useState<Task[] | null>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const todosPerPage = 4;

    const handlePageButton = (
        e: React.MouseEvent<HTMLButtonElement>,
        action: string
    ) => {
        e.preventDefault();
        if (action === "previous") {
            setCurrentPage((prev) => prev - 1);
        } else {
            setCurrentPage((prev) => prev + 1);
        }
        setShouldRefetch(true);
    };

    const toggleTodoCompletion = async (todoId: string) => {
        try {
            if(!todos) return
            const updatedTodos = todos.map((todo) => {
                if (todo.id === todoId) {
                    return {
                        ...todo,
                        isCompleted: !todo.isCompleted,
                    };
                }
                return todo;
            });

            setTodos(updatedTodos);

            await axios.put(`http://localhost:5000/api/todo/update`, {
                id: todoId,
                isCompleted: updatedTodos.find((todo) => todo.id === todoId)
                    ?.isCompleted,
            });

            setShouldRefetch(true);
        } catch (error) {
            toast.error("Something went wrong.")

        }
    };

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                let response;
                if (pathname === "/all") {
                    response = await axios.get(
                        `http://localhost:5000/api/todo/get?page=${currentPage}&limit=${todosPerPage}`
                    );
                } else {
                    response = await axios.get(
                        `http://localhost:5000/api/todo/get?completionStatus=${pathname.slice(
                            11
                        )}&page=${currentPage}&limit=${todosPerPage}`
                    );
                }

                setTodos(response.data.limitedTodos);
                setTotalPages(
                    Math.ceil(response.data.todoLength / todosPerPage)
                );
                setShouldRefetch(false);
            } catch (error) {
                toast.error("Something went wrong.")
            }
        };
        if (shouldRefetch) {
            fetchTodos();
        }
    }, [shouldRefetch, currentPage, pathname]);

    return (
        todos !== null && todos.length !== 0 ? (
            <div className="flex items-center flex-col">
                <ul
                    role="list"
                    className="mt-4 w-full divide-y divide-gray-400"
                >
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`flex justify-between py-3 ${
                                todo.isCompleted ? "line-through" : ""
                            }`}
                        >
                            <div className="flex w-full min-w-0 gap-x-4 px-2 sm:px-1 justify-between items-center">
                                <input
                                    type="checkbox"
                                    className="rounded"
                                    checked={todo.isCompleted}
                                    onChange={() =>
                                        toggleTodoCompletion(todo.id)
                                    }
                                />
                                <div className="min-w-0 flex-auto">
                                    <p
                                        className={`text-lg font-semibold text-gray-900 ${
                                            todo.isCompleted
                                                ? "text-gray-400"
                                                : ""
                                        }`}
                                    >
                                        {todo.title}
                                    </p>
                                    <span className="text-gray-600">
                                        {dateFormat(
                                            todo.createdAt,
                                            "mmm dS, h:MM TT"
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <EditTodoButton todo={todo} />
                                    <DeleteTodoButton id={todo.id} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center width-full flex-grow-1">
                    {currentPage > 1 ? (
                        <button
                            className="rounded border w-24 bg-indigo-800 px-3 py-1 text-sm text-gray-100 hover:bg-indigo-700"
                            onClick={(e) => handlePageButton(e, "previous")}
                        >
                            Previous
                        </button>
                    ) : null}
                    {currentPage < totalPages ? (
                        <button
                            className="rounded border w-24 bg-indigo-800 px-3 py-1 text-sm text-gray-100 hover:bg-indigo-700"
                            onClick={(e) => handlePageButton(e, "next")}
                        >
                            Next
                        </button>
                    ) : null}
                </div>
            </div>
        ) : null
    );
};

export default TodosList;
