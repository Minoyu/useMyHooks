# `useDocumentTitle`
一个可以很方便的更新页面`title`的小钩子。

## Usage

```jsx
import useDocumentTitle from '../useDocumentTitle';

const Demo = () => {
    ......
    useDocumentTitle( pageNameState , "示例网站" );
    ......
};
```
- 当`pageNameState`改变时，页面的`title`即更新为 `newName - 示例网站`

## Reference

```ts
useDocumentTitle(title: string, subtitle?: string);
```
- **`title`**_`: string`_ - 主标题，必填;
- **`subtitle`**_`: string`_ - 副标题，选填;