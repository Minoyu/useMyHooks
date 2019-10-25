# `useBooleanState`
论如何优雅的使用和管理一个`boolean`状态。

## Usage

```jsx
import useBooleanState from '../useDocumentState';

const Demo = () => {
    const [ isLoading, toggleIsLoading, startLoading, loaded, setIsLoading ]= useBooleanState(false);
    ......
    startLoading(); // true
    loaded(); //false
    toggleIsLoading(); // isLoading取反
    setIsLoading(true);
    setIsLoading(false);
    ......

    return <div>{isLoading ? "加载中" : "加载已完成" }</div>;
};
```

## Reference

```ts
const [ value, toggleValue, setTrue, setFalse, setValue ]= useBooleanState(initValue : boolean);
```
- **`value`**_`: boolean`_ - boolean 状态值;
- **`toggleValue`**_`: ()=>void`_ - 切换状态;
- **`setTrue`**_`: ()=>void`_ - 设为 `true`;
- **`setFalse`**_` :()=>void`_ - 设为 `false`;
- **`setValue`**_`: (value:boolean)=>void`_ - 设置value值;

- **`initValue`**_`: boolean`_ - 初始值