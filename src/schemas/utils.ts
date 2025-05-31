import { HTMLAttributes } from "react";

export type IDatepickerInput = HTMLAttributes<HTMLInputElement>;

export const EDatepickerDateType = {
  END: "END",
  START: "START",
} as const;

export type TDatepickerDateTypesValue = ValueOf<typeof EDatepickerDateType>;
