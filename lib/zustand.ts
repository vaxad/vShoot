import { create } from "zustand";
import { combine } from "zustand/middleware";

const store = create(
  combine(
    {
      user: null as UserNull,
      err: false as Boolean,
      errText: "Some error occured" as String,
    },
    (set) => ({
      setUser: (item: UserNull) => set(() => ({ user: item })),
      setErr: (item: Boolean) => set(() => ({ err: item })),
      setErrText: (item: String) => set(() => ({ errText: item })),
    }),
  ),
);
export default store;
