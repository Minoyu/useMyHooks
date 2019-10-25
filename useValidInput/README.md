# `useValidInput`
`input` 带验证更正的输入框逻辑。

## Usage

假设我们需要在输入时过滤空格。

```jsx
import useValidInput from '../useValidInput';

const Demo = () => {
    // 用于保存结果值的State
    const [str,setStr] = useState("");
    .....
    // 此处value为供input临时显示的值
    const [value, handleChange] = useValidInput({
        value:"不含空格的字符串",
        isValid:!(/\s+/g).test(value),
        toValid: (value) => value.replace(validNameReg, ""),
        setValue: (value) => setStr(value),
        // 如不需要每次change都进行验证可设置为false,仅 onBlur 时验证
        needVerifyDuringChanging = true,
    });
    ......

    return (
        <div>
            <input type="text" value={value} onChange={handleChange}/>
            <div>当前已验证的字符串结果为 {str}</div>
        </div>
        );
};
```

## Reference

```ts
interface IValidInput {
  value?: string;
  isValid?(value: string): boolean;
  toValid?(value: string): string;
  setValue?(value: string): any;
  needVerifyDuringChanging?: boolean;
}

const [value, handleChange, handleBlur] = useValidInput(props:IValidInput);
```
### 参数
- **`value`**_`: string`_ - 可选，初始化输入框的值，可传state，改变时会更新输入框;
- **`isValid`**_`: (value: string)=> boolean`_ - 可选，验证当前输入值是否正确的方法，正确时调用setValue (若存在)，否则调用toValid更正 (若存在);
- **`toValid`**_`: (value: string)=> string`_ - 可选，验证当前输入值错误时调用的更正方法;
- **`setValue`**_`: (value: string)=> any`_ - 可选，验证当前输入值成功时调用的方法;
- **`needVerifyDuringChanging`**_`: boolean`_ - 可选，是否需要输入值每次change都进行验证，默认为 `true`;
### 返回值
- **`value`**_`: string`_ - 供input显示的值;
- **`handleChange`**_`: (v: ChangeEvent) => void`_ - 处理输入框`onChange`的方法;
- **`handleBlur`**_`: (v: ChangeEvent) => void`_ - 处理输入框`onBlur`的方法;