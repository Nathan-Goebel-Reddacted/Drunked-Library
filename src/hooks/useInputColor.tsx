import { useEffect } from "react";
import type { RefObject } from "react";
import { stringToColor, stringToBorderColor } from "../components/colorTools";

export function useInputColor(value: string, ref: RefObject<HTMLInputElement|null>) {
  useEffect(() => {
    const input = ref.current;
    if (!input) return;

    input.style.setProperty("--input-bg", value.trim() ? stringToColor(value) : "white");
    input.style.setProperty("--input-border", value.trim() ? stringToBorderColor(value) : "black");
  }, [value]);
}