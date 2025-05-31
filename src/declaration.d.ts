import { FC, PropsWithChildren } from "react";

declare module "*.module.scss" {
  const value: Record<string, string>;
  // export default value;
}

declare global {
  type ValueOf<T> = T[keyof T];
  type FCC<T = {}> = FC<PropsWithChildren<T>>;
}
