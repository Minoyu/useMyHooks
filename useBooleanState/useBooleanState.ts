import { useState, useCallback, Dispatch, SetStateAction } from "react";

export default function useBooleanState(initValue: boolean): [
  boolean,
  () => void,
  () => void,
  () => void,
  Dispatch<SetStateAction<boolean>>
] {
  const [v, setV] = useState(initValue);
  const toggle = useCallback(() => setV(!v), [v]);
  const setTrue = useCallback(() => setV(true), []);
  const setFalse = useCallback(() => setV(false), []);
  return [v, toggle, setTrue, setFalse, setV];
}