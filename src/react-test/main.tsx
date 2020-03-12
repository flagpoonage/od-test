import './style/main.pcss';

import * as React from 'react';
import { useState } from 'react';
import { generateRGB, randomMax } from './utils';

type BoxDescription = {
  color: string;
  left: number;
  top: number;
};

const generateBox = () => ({
  color: generateRGB(),
  left: randomMax(96),
  top: randomMax(96)
});

const initialState = [
  generateBox(),
  generateBox(),
  generateBox(),
  generateBox(),
  generateBox(),
  generateBox()
];

export function Main () {
  
  const [ boxesState, setBoxesState ] = useState<BoxDescription[]>(initialState);
  const [ cursorState, setCursorState ] = useState<{ x: number, y: number, display: string  }>({ x: 0, y: 0, display: '' });

  const onMouseMove = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.persist();
    window.requestAnimationFrame(() => {
      const target = (event.target as HTMLDivElement);
      const is_box = target.classList.contains('box');

      let x = event.pageX;
      let y = event.pageY;

      if (is_box) {
        const bounds = target.getBoundingClientRect();
        const w2 = bounds.width / 2;
        const h2 = bounds.height / 2;

        const center = { x: bounds.left + w2, y: bounds.top + h2 };

        x = center.x - ((center.x - x) / 5);
        y = center.y - ((center.y - y) / 5);

        // console.log(x, y);
      }

      setCursorState({ x, y, display: target.classList.contains('box') ? target.style.backgroundColor : '' });
    })
  }, [setCursorState]);

  return (
    <div className="main" onMouseMove={onMouseMove}>
      <div className="control">
        <button onClick={() => setBoxesState([...boxesState, generateBox()])}>Add Box</button>
      </div>
      {boxesState.map((box, index) => (
        <div key={`box_${index}`} className="box" style={{ backgroundColor: box.color, left: `${box.left}%`, top: `${box.top}%`}}>
        </div>
      ))}

      <div className="crosshair-x" style={{ top: `${cursorState.y}px`}}></div>
      <div className="crosshair-y" style={{ left: `${cursorState.x}px`}}></div>
      {cursorState.display && (
        <div className="crosshair-display" style={{ top: `${cursorState.y}px`, left: `${cursorState.x}px` }}>
          <div className="content">
            {cursorState.display}
          </div>
        </div>
      )}
    </div>
  )
}