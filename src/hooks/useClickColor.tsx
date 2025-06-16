import { useState } from "react";

export function useClickColor(initialColor: string = "black") {
  const [color, setColor] = useState(initialColor);

  const handleClick = () => {
    const hue = Math.floor(Math.random() * 360);
    const newColor = `hsl(${hue}, 70%, 80%)`;
    setColor(newColor);
  };

  return [color, handleClick] as const;
}