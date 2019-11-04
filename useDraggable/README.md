# `useDraggable`

钩子实现组件实时拖动，通过计算鼠标拖拽的位移，使用`CSS transform`实现。

## Usage

```jsx
import useDraggable from '../useDraggable';

const Demo = () => {
    ......
    // 组件坐标状态值
    const [position , setPosition] = useState({ x:0 , y:0 });
    const [x, y, dragging, handleMouseDown] = useDraggable({
        x : position.x,
        y : position.y,
        onStop : (x,y)=>{
            // return false; 若拖动不符合要求，return false 后将复位到初始值
            console.log(`拖动后的坐标为 x:${x} y:${y}`);
            setPosition({ x , y }); //更新本组件中维护的状态值
        },
        disabled : false,
        scale : 1,
    });
    ......

    return (
        <div>
            <Component style={{transform: `translate(${x}px,${y}px)`}} onMouseDown={handleMouseDown} />
            <div>正在拖拽：{dragging?"是":"否"}</div>
        </div>
    );
};
```

## Reference

```ts
/**
 * 参数
*/
interface IUseDraggale {
  x: number;
  y: number;
  onStop([x, y]: [number, number]): boolean | void;
  disabled?: boolean;
  scale?: number;
}

const [x, y, dragging, handleMouseDown] = useDraggable(props:IUseDraggable);
```

### 参数

- **`x`**_`: number`_ - 初始横坐标，必填;
- **`y`**_`: number`_ - 初始纵坐标，必填;
- **`onStop`**_`: ([x,y]:[number,number])=>boolean | void`_ - 拖拽结束后的回调，必填，应在此回调更新传入的初始坐标状态，以实现拖动完成的效果。若返回 false，则拖动无效，复位为初始值。
- **`disabled`**_`: boolean`_ - 是否禁用，可选，若设置为`true`,则无法拖动。
- **`scale`**_`: number`_ - 外部整体画面缩放比例，可选，默认值为 1。例如整个画面被放大了 2 倍，鼠标位移同样距离，实际移动距离应为 距离/2。

### 返回值

- **`x`**_`:number`_ - 展示组件位移的纵坐标，用于 CSS 位移:`transform: translate(${x}px,${y}px)`。
- **`y`**_`:number`_ - 展示组件位移的横坐标。
- **`dragging`**_`:boolean`_ - 组件是否正在被拖拽。
- **`handleMouseDown`**_`: (e: React.MouseEvent) => void`_ - 用于处理组件`onMouseDown`的方法。
