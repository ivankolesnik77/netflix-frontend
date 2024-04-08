import { useState, useEffect } from "react";

import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "../store";

export const useTimer = (isClicked: boolean, initialDelay?: 3000) => {
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isClicked) setIsUpdate(true);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [isClicked]);

  useEffect(() => {
    if (isUpdate) setIsUpdate(!isUpdate);
  }, [isUpdate]);

  return isUpdate;
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
