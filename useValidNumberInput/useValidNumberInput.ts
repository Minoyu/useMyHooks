import useValidInput from "../useValidInput/useValidInput";

type NumType = "Int" | "Float";

interface IUseValidNumberInputProps {
  value: number;
  toValid?: (value: number) => number;
  isValid?: (value: number) => boolean;
  setValue: (value: number) => void;
  numType?: NumType;
  needVerifyDuringChanging?: boolean;
}

export default function useValidInputNumber(
  {
    value,
    toValid,
    isValid,
    setValue,
    numType = "Float",
    needVerifyDuringChanging
  }: IUseValidNumberInputProps,
) {
  return useValidInput<string>({
    value: value.toString(),
    isValid: targetValue => {
      const num = parseFloat(targetValue);
      if (isNaN(num)) {
        return false;
      }
      if (numType === "Int" && ~~num !== num) {
        return false;
      }
      return isValid(num);
    },
    toValid: targetValue => {
      let num = parseFloat(targetValue);
      if (numType === "Int") {
        num = ~~num;
      }
      return toValid(num).toString();
    },
    setValue: targetValue => {
      let num = parseFloat(targetValue);
      if (numType === "Int") {
        num = ~~num;
      }
      setValue(num);
    },
    needVerifyDuringChanging
  });
}