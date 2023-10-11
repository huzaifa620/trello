import { Draggable, Droppable } from 'react-beautiful-dnd'

type Props = {
    id: TypedColumn,
    todos: Todo[],
    index: number
}

const idToColumnText: {
    [key in TypedColumn]: string;
} = {
    todo: "To Do",
    inProgress: "In Progress",
    done: "Done"
}

const Column = ({ id, todos, index}: Props) => {
  return (
    <Draggable draggableId={id} index={index}>
        {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>

                <Droppable droppableId={index.toString()} type='card'>

                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className={`p-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver ? "bg-green-200": "bg-white/50"}`}>

                            <h2 className='flex justify-between font-bold text-xl p-2'>
                                {idToColumnText[id]}
                            </h2>

                            <span className='text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal'>
                                {todos.length}
                            </span>

                            <div className='space-y-2'>
                                {todos.map((todo, index) => (
                                    <Draggable key={todo.$id} draggableId={todo.$id} index={index}>
                                        {(provided) => {
                                            <TodoCard />
                                        }}                                        
                                    </Draggable>
                                ))}
                            </div>

                        </div>
                    )}

                </Droppable>

            </div>
        )}
    </Draggable>
  )
}

export default Column