import * as React from 'react';
import { TodoContextType, ITodo } from '../api/types/toDo';
import { TodoContext } from '../context/TodoContext';
import Todo from '../components/Todo';

const Todos = () => {
    const { todos, updateTodo } = React.useContext(TodoContext) as TodoContextType;
    return (
        <>
            {todos.map((todo: ITodo) => (
                <Todo key={todo.id} updateTodo={updateTodo} todo={todo} />
            ))}
        </>
    );
};

export default Todos;