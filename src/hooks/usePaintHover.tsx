import { useState } from "react";

export function usePaintHover(): {
  onMouseEnter: () => void;
  backgroundColor: string;
} {
  const [backgroundColor, setBackgroundColor] = useState("white");

  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
  };

  return {
    onMouseEnter: () => setBackgroundColor(getRandomColor()),
    backgroundColor,
  };
}
