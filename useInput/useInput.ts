import { useState, useCallback } from "react";

export interface ITargetValue {
  target: {
    value: string;
  }
}

export type ChangeEvent = string | ITargetValue;

function getEventValue(v: ChangeEvent): string {
  if ((v as ITargetValue).target) {
    return (v as ITargetValue).target.value;
  } else {
    return v as string;
  }
}

export default function useInput(initValue?: string): [string, (v: ChangeEvent) => void] {
  const [value, setValue] = useState(initValue ? initValue : '');
  const handleChange = useCallback((v: ChangeEvent) => {
    setValue(getEventValue(v));
  }, []);
  return [value, handleChange];
}