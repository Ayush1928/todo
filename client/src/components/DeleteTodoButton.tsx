import TodoContext from '@/Context/TodoContext';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import * as React from 'react';
import { toast } from 'react-hot-toast';

interface IDeleteTodoButtonProps {
    id: string
}

const DeleteTodoButton: React.FunctionComponent<IDeleteTodoButtonProps> = ({ id }) => {
    const context = React.useContext(TodoContext)
    const setShouldRefetch = context.setShouldRefetch
    const baseUrl = process.env.BASE_URL
    const deleteTodo = async () => {
        try {
            const response = await axios.delete(`${baseUrl}/todo/delete?${id}`, {
                params: {
                    id: id
                }
            })
            if (response.status === 200) {
                toast.success("Todo Deleted")
                setShouldRefetch(true)
            }
        } catch (error) {
            toast.error("Something went wrong. Try again later.")
        }
    }
    return (
        <button onClick={deleteTodo}>
            <Trash2 />
        </button>
    );
};

export default DeleteTodoButton;
