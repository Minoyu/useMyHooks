import { useState, useCallback, useEffect } from "react";

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

interface IValidInput {
  value?: string;
  isValid?(value: string): boolean;
  toValid?(value: string): string;
  setValue?(value: string): any;
  needVerifyDuringChanging?: boolean;
  // 是否需要在onChange时验证更新
}

/**
 * call `setValue` only when `isValid` returns true
 * @returns `[value, handleChange, handleBlur]`
 */
export default function useValidInput<T = string>({
  value,
  isValid = _ => true,
  toValid = _ => _,
  setValue,
  needVerifyDuringChanging = true
}: IValidInput): [
    T,
    (e: ChangeEvent) => void,
    (e: ChangeEvent) => void
  ] {
  const [v, setV] = useState<string>(value || '');
  const [valueChanged, setValueChanged] = useState<boolean>(false);
  //当传入 value 改变时更新输入框value 
  useEffect(() => setV(value), [value]);
  
  const handleChange = useCallback((e: ChangeEvent) => {
    const targetValue = getEventValue(e);
    setV(targetValue);
    setValueChanged(true);
    needVerifyDuringChanging && isValid(targetValue) && setValue && setValue(targetValue);
  }, [isValid, setValue]);

  const handleBlur = useCallback((e: ChangeEvent) => {
    const targetValue = getEventValue(e);
    if (!valueChanged) { return; }
    setValueChanged(false);
    const validValue = isValid(targetValue) ? targetValue : toValid(targetValue);
    setV(validValue);
    setValue && setValue(validValue);
  }, [isValid, toValid, setValue]);
  
  return [v, handleChange, handleBlur];
}