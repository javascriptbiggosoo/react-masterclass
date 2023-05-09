import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const handleDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;
    console.log(info);

    if (!destination) return;
    /*  if (destination.droppableId === source.droppableId) {
      setToDos((currBoards) => {
        const boardCopy = [...currBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, draggableId);
        return {
          ...currBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((oldBoards) => {
        const sourceBoard = [...oldBoards[source.droppableId]];
        const destinationBoard = [...oldBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index || 0, 0, draggableId);
        return {
          ...oldBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    } */
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}{" "}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
