import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { BoardTypes } from "../../context";
import Card from "./Card";
import Header from "./Header";

interface Props {
  item: BoardTypes;
}

const Board: React.FC<Props> = (props) => {
  const { item } = props;
  return (
    <Droppable droppableId={item.id}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="board__wrapper"
          >
            <Header item={item} />
            <div className="board__list">
              {item.items.map((val, index) => (
                <Card key={index} boardId={item.id} item={val} index={index} />
              ))}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export default Board;
