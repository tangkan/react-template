import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface IParams {
  title: string;
  id: string;
}

interface IBearActions {
  setTitle: (title: string) => void;
  setId: (status: string) => void;
}

const initBearData: IParams = {
  title: "",
  id: "",
};

export const useParamsStroe = create<IParams & IBearActions>()(
  immer((set) => ({
    ...initBearData,
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
