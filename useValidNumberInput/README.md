# `useValidNumberInput`
基于 `useValidInput` 封装的带验证更正的数字输入框逻辑。

## Usage

假设我们需要输入月份（范围 1-12）。

```jsx
import useValidNumberInput from '../useValidNumberInput';

const Demo = () => {
    // 用于保存结果值的State
    const [month,setMonth] = useState(1);
    .....
    // 此处value为供input临时显示的值
    const [value, handleChange, handleBlur] = useValidNumberInput({
        value: 1,
        isValid: (value) => value >= 1 && value <= 12,
        toValid: (value) => value > 12 ? 12 : (value < 1 ? 1 : value ),
        numType: "Int",
        setValue: (value) => setMonth(value),
        // 如不需要每次change都进行验证可设置为false,仅 onBlur 时验证
        needVerifyDuringChanging = false,
    });
    ......

    return (
        <div>
            <input type="text" value={value} onChange={handleChange} onBlur={handleBlur}/>
            <div>当前已验证的月份结果为 {month}</div>
        </div>
        );
};
```
- 当输入小于1的数更正为1，大于12的数更正为12。

## Reference

```ts
interface IUseValidNumberInputProps {
  value: number;
  isValid?: (value: number) => boolean;
  toValid?: (value: number) => number;
  setValue: (value: number) => void;
  numType?: "Int" | "Float";
  needVerifyDuringChanging?: boolean;
}

const [value, handleChange, handleBlur] = useValidInput(props:IValidInput);
```
### 参数
- **`value`**_`: number`_ - 可选，初始化输入框的值，可传state，改变时会更新输入框;
- **`isValid`**_`: (value: number)=> boolean`_ - 可选，验证当前输入值是否正确的方法，正确时调用setValue (若存在)，否则调用toValid更正 (若存在);
- **`toValid`**_`: (value: number)=> number`_ - 可选，验证当前输入值错误时调用的更正方法;
- **`setValue`**_`: (value: number)=> any`_ - 可选，验证当前输入值成功时调用的方法;
- **`numType`**_`: "Int" | "Float"`_ - 可选，默认为`"Float"`,如设置为 `"Int"` 则对输入值向下取整;
- **`needVerifyDuringChanging`**_`: boolean`_ - 可选，是否需要输入值每次change都进行验证，默认为 `true`;
### 返回值
- **`value`**_`: string`_ - 供input显示的值;
- **`handleChange`**_`: (v: ChangeEvent) => void`_ - 处理输入框`onChange`的方法;
- **`handleBlur`**_`: (v: ChangeEvent) => void`_ - 处理输入框`onBlur`的方法;