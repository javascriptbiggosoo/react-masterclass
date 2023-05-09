import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    toDo: [
      { text: "dummy", id: 1 },
      { text: "dummy2", id: 2 },
    ],
    doing: [],
    done: [],
  },
});
