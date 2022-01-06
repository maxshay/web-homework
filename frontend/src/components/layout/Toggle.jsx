import React from "react";
import { useStore } from "../../store";

// https://stackoverflow.com/questions/68431508/how-to-configure-localization-with-react-router-and-i18-directly-from-url-as-lan
// https://medium.com/how-to-react/setup-multilingual-in-react-js-using-i18n-module-33b1bfbb57cd

export function Toggle() {
  const lang = useStore((state) => state.lang);
  const setLang = useStore.getState().setLang;

  const mode = useStore((state) => state.mode);
  const setMode = useStore.getState().setMode;

  const handleCheck = () => {
    if (mode === 0) setMode(1);
    else setMode(0);
  };

  const handleChangeLang = () => {
    if (lang === 0) {
      setLang(1);
    } else {
      setLang(0);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <label htmlFor="toggleA" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id="toggleA"
            className="sr-only"
            checked={lang === 1}
            onChange={handleChangeLang}
          />
          <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
          <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
        </div>
        <div className="ml-3 text-gray-700 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
          Translate
        </div>
      </label>

      <label
        htmlFor="toggleB"
        className="flex items-center cursor-pointer mt-2"
      >
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
        <div className="ml-3 text-gray-700 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
          Roman Numerals
        </div>
      </label>
    </div>
  );
}
