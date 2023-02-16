import { Categories, IToDo, toDoState } from "./../atoms";
import { useSetRecoilState } from "recoil";

export default function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = ev;
    setToDos((currToDos) => {
      // const targetIndex = currToDos.findIndex((toDo) => toDo.id === id);
      const newToDos = currToDos.map((toDo) => {
        if (toDo.id === id) {
          toDo = { text, id, category: name as any };
        }
        return toDo;
      });
      return newToDos;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING + ""} onClick={handleClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO + ""} onClick={handleClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE + ""} onClick={handleClick}>
          Done
        </button>
      )}
    </li>
  );
}
