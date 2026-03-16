import { useDraggable, useDroppable } from "@dnd-kit/react"
import type { ReactNode } from "react"

export const Draggable = ({id}: {id: string}) => {

  const {ref} = useDraggable({
    id: id
  })


  return (
    <div className="bg-green-500 p-[30px] gap-[10px]" ref={ref}>
      <h1>Dragable Box</h1>
    </div>
  )
}

export const Droppable = ({id, children}: {id: string, children: ReactNode }) => {

  const {ref} = useDroppable({
    id:  id
  })

  return (
    <div className="h-[80px] w-[80px] grid gap-[15px] bg-blue-500" ref={ref}>
    {children}
    </div>
  )
}


import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";

export function DragabbleApp() {

    const targets = ['A', 'B', 'C'];
  const [target, setTarget] = useState();
  const draggable = (
    <Draggable id="draggable">Drag me</Draggable>
  );

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        setTarget(event.operation.target?.id);
      }}
    >
      {!target ? draggable : null}

      {targets.map((id) => (
        <Droppable key={id} id={id}>
          {target === id ? draggable : `Droppable ${id}`}
        </Droppable>
      ))}
    </DragDropProvider>
  )
}
