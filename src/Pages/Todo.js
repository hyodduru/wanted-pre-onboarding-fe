import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { GrAddCircle } from "react-icons/gr";
import { VscCircleOutline } from "react-icons/vsc";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { RiSaveLine } from "react-icons/ri";

import { BASE_URL, getToken } from "../config";

const Todo = () => {
  const navigate = useNavigate();
  const token = getToken();
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState({
    id: "",
    todo: "",
    isCompleted: false,
  });

  const getTodos = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (data) {
        setTodos(data);
      }
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return navigate("/");
    getTodos();
  }, [navigate, token, getTodos]);

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/todos`,
        { todo: newTodo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        alert("추가되었습니다!");
        getTodos();
        setNewTodo("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 204) {
        alert("삭제되었습니다.");
        getTodos();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateTodo = async () => {
    const { id, todo, isCompleted } = editTodo;
    try {
      const res = await axios.put(
        `${BASE_URL}/todos/${id}`,
        { todo, isCompleted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setEditTodo({ id: "", todo: "", isCompleted: false });
        alert("수정되었습니다.");
        getTodos();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <Title>TO DO LIST</Title>
      <Form onSubmit={addTodo}>
        <Input onChange={(e) => setNewTodo(e.target.value)} value={newTodo} />
        <AddBtn htmlFor="submit">
          <GrAddCircle />
        </AddBtn>
      </Form>
      <TodoList>
        {todos.map(({ todo, id, isCompleted }) => {
          return (
            <ListItem key={id}>
              <div>
                {editTodo.id === id ? (
                  <>
                    <input
                      type="checkbox"
                      checked={editTodo.isCompleted}
                      onChange={(e) =>
                        setEditTodo({
                          ...editTodo,
                          isCompleted: e.target.checked,
                        })
                      }
                    />
                    <EditInput
                      value={editTodo.todo}
                      onChange={(e) =>
                        setEditTodo({ ...editTodo, todo: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <div style={{ position: "relative" }}>
                    <VscCircleOutline />
                    {todo}
                    {isCompleted && <Line />}
                  </div>
                )}
              </div>
              <ButtonBox>
                {editTodo.id === id ? (
                  <UpdateBtn onClick={updateTodo} />
                ) : (
                  <>
                    <EditBtn
                      onClick={() => setEditTodo({ id, todo, isCompleted })}
                    />
                    <DeleteBtn onClick={() => deleteTodo(id)} />
                  </>
                )}
              </ButtonBox>
            </ListItem>
          );
        })}
      </TodoList>
    </Wrapper>
  );
};

export default Todo;

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper()};
  margin: 60px auto;
  padding: 50px 0 10px 0;
  width: 500px;
  text-align: center;
  border-radius: 5px;
  background: ${({ theme }) => theme.fontSub};
`;

const Title = styled.h1`
  color: black;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  margin: 20px 0;
  padding: 10px;
  border: 1px #eeeeee solid;
  border-radius: 5px;
`;

const AddBtn = styled.button`
  margin: 0 10px;
  font-size: ${({ theme }) => theme.fontMedium};
  border: 0;
  cursor: pointer;
`;

const TodoList = styled.ul`
  padding: 10px;
  margin: 50px auto;
  width: 450px;
`;

const EditInput = styled.input`
  padding: 5px;
  width: 300px;
  border: 1px solid #dbdbdb;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding: 10px;
  width: 430px;
  background: white;
`;

const Line = styled.div`
  position: absolute;
  height: 1.2px;
  background: black;
  width: 101%;
  left: 3px;
  bottom: 11px;
`;

const EditBtn = styled(FiEdit)`
  margin: 0 10px;
  cursor: pointer;
`;

const DeleteBtn = styled(MdDeleteOutline)`
  cursor: pointer;
`;

const UpdateBtn = styled(RiSaveLine)`
  cursor: pointer;
`;

const ButtonBox = styled.div`
  display: flex;
`;
