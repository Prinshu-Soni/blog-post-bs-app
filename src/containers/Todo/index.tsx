import React, { useEffect, useState } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import PaginationLayout from 'src/components/PaginationLayout';
import { getTodoData } from 'src/state/todo/actions';

type Props = {
  userId: number;
};

const Todo: React.FC<Props> = ({ userId }) => {
  const dispatch = useDispatch();
  const [localTodos, setLocalTodos] = useState<TodoData[]>([]);

  const { loading, todos } = useSelector((state: ReduxStore) => ({
    todos: state.todo.data,
    loading: state.common.todoLoading,
  }));

  useEffect(() => {
    if (todos) {
      setLocalTodos((prevTodos) => [...prevTodos, ...todos]);
    }
  }, [todos]);

  const loadTodoData = async (userId: number, pageNumber: number) => {
    await dispatch(getTodoData(userId, pageNumber));
  };

  const todoList = (
    <ListGroup variant="flush">
      {localTodos &&
        localTodos.map((todo) => (
          <ListGroup.Item key={todo.id}>
            {todo.title}
            <span className="float-right">
              {todo.completed ? (
                <IoIosCheckmarkCircle />
              ) : (
                <IoIosCheckmarkCircleOutline />
              )}
            </span>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );

  return (
    <div id="scroll-box" className="h-200 overflow-auto">
      {loading && localTodos.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-200">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        todoList
      )}
      <PaginationLayout
        pageType="todo"
        userId={userId}
        loadData={loadTodoData}
      ></PaginationLayout>
    </div>
  );
};

export default Todo;
