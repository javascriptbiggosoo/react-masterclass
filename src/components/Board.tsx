import React, { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { IToDo } from "../atoms";

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "crimson"
      : props.isDraggingFromThis
      ? "pink"
      : "wheat"};
  flex-grow: 1;
  transition: background-color 0.2s ease-in;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
const Container = styled.div`
  width: 300px;
  overflow: hidden;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log(data);
    setValue("toDo", ""); // "toDo" 인풋을 다시 "" 로 비워준다
  };
  return (
    <Container>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add a new ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, idx) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                idx={idx}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Container>
  );
}
