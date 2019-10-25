# `useInput`
借助 Hook 来优雅的实现 `input` 输入。

## Usage

```jsx
import useInput from '../useInput';

const Demo = () => {
    const [value, handleChange] = useInput("默认值");
    ......

    return <input type="text" value={value} onChange={handleChange}/>;
};
```

## Reference

```ts
const [value, handleChange] = useInput("默认值");
```
- **`value`**_`: string`_ - input 当前的状态值;
- **`handleChange`**_`: (v: ChangeEvent) => void`_ - 处理输入框`onChange`方法;