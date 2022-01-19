import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Edit, Trash, X } from "react-feather";
import { Item } from "../../context";
import { AppContext } from "../../context/provider";

interface Props {
  item: Item;
  boardId: string;
  index: number;
}

export const onChangeValidUrl = (str: string): string => {
  if (str.indexOf("http://") === 0 || str.indexOf("https://") === 0) {
    return str;
  } else {
    return `http://${str}`;
  }
};

const Card: React.FC<Props> = ({ boardId, item, index }) => {
  const { dispatch } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState("");

  let regexLink = new RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  );

  let onEditMode = (boardId: string, itemId: string) => {
    dispatch({
      type: "UPDATE_ITEM",
      payload: { boardId, itemId, data: value },
    });
    setValue("");
    setEditMode(false);
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="board__item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="board__item__content">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={value}
                  className="board__item__input"
                  onChange={(e) => setValue(e.target.value)}
                />
                <div className="board__item__actions">

                <Edit
                    className="icon safe"
                    onClick={() => {
                      onEditMode(boardId, item.id);
                    }}
                  />
                <X
                    className="icon danger"
                    onClick={() => {
                      setEditMode(!editMode);
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                {item.name.match(regexLink) ? (
                  <a
                    href={onChangeValidUrl(item.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="board__item__name"
                  >
                    {item.name}
                  </a>
                ) : (
                  <span className="board__item__name">{item.name}</span>
                )}
                <div className="board__item__actions">
                  <Edit
                    className="icon safe"
                    onClick={() => {
                      setEditMode(!editMode);
                    }}
                  />

                  <Trash
                    className="icon danger"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_ITEM",
                        payload: { boardId: boardId, itemId: item.id },
                      })
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
