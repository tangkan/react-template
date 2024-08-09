import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface IParams {
  title: string;
  id: string;
}

interface IActions {
  setTitle: (title: string) => void;
  setId: (status: string) => void;
}

const initData: IParams = {
  title: "",
  id: "",
};

export const useParamsStroe = create<IParams & IActions>()(
  immer((set) => ({
    ...initData,
    setTitle: (title) => {
      set((state) => {
        state.title = title;
      });
    },
    setId: (id) => {
      set((state) => {
        state.id = id;
      });
    },
  }))
);
