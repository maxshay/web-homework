import React from "react";
import { useStore } from "../../store";
export function Toggle() {
  const mode = useStore((state) => state.mode);
  const setMode = useStore.getState().setMode;

  const handleCheck = () => {
    if (mode === 0) setMode(1);
    else setMode(0);
  };

  return (
    <div className="flex items-center w-full">
      <label htmlFor="toggleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id="toggleB"
            className="sr-only"
            checked={mode === 1}
            onChange={handleCheck}
          />
          <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
          <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
        </div>
        <div className="ml-3 text-gray-700 font-medium">Roman Numerals</div>
      </label>
    </div>
  );
}
