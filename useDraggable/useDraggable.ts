import { useState, useEffect, useRef, useCallback } from "react";

interface IUseDraggale {
  x: number;
  y: number;
  onStop([x, y]: [number, number]): boolean | void;
  disabled?: boolean;
  scale?: number;
}

/**
 * 使组件可实时拖动，通过计算鼠标位移，使用transform实现
 * @param onStop returns `false` to cancel
 * @returns `[x, y, dragging, handleMouseDown]`
 * @example <Component style={{transform: `translate(${x}px,${y}px)`}} onMouseDown={handleMouseDown} />
 */
export default function useDraggable({
  x,
  y,
  onStop,
  disabled,
  scale
}: IUseDraggale): [number, number, boolean, (e: React.MouseEvent) => void] {
  const [[dx, dy], setPos] = useState<[number, number]>([x, y]);
  const [dragging, setDragging] = useState<boolean>(false);
  const startPos = useRef([0, 0]);

  useEffect(() => setPos([x, y]), [x, y]);

  /**
   * 计算拖动后点的坐标
   */
  const calcPos = useCallback(
    (e: MouseEvent): [number, number] => {
      const [startX, startY] = startPos.current;
      /**
       * 此处scale为整体的缩放倍数，例如整个画面被放大了2倍，鼠标位移同样距离，实际移动距离应为 距离/2.
       * scale值可为空，默认为1
       */
      const realMultiple = scale ? parseFloat((1 / scale).toFixed(4)) : 1;
      return [
        Math.floor((e.pageX - startX) * realMultiple + dx),
        Math.floor((e.pageY - startY) * realMultiple + dy)
      ];
    },
    [startPos.current, scale, dx, dy]
  );

  useEffect(() => {
    if (dragging) {
      const handleMouseMove = (e: MouseEvent) => {
        setPos(calcPos(e));
        // prevent the event propagate to it's parents
        e.stopPropagation();
      };
      const handleMouseUp = (e: MouseEvent) => {
        setDragging(false);
        // 若onStop返回false则拖动无效，设回初始值
        onStop(calcPos(e)) === false && setPos([x, y]);
        e.stopPropagation();
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp, { once: true });
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
    return undefined;
  }, [dragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    startPos.current = [e.pageX, e.pageY];
    setDragging(true);
    e.stopPropagation();
  };

  return [dx, dy, dragging, disabled ? null : handleMouseDown];
}
