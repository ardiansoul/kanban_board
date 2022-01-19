import React, { useContext, useState } from "react";
import { Edit } from "react-feather";
import { BoardTypes } from "../../context";
import { AppContext } from "../../context/provider";

interface Props {
  item: BoardTypes;
}

const Header: React.FC<Props> = ({ item }) => {
  const { dispatch } = useContext(AppContext);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [editMode, setEditMode] = useState(false);

  const onChangeBoard = () => {
    dispatch({
      type: "CHANGE_BOARD",
      payload: {
        boardId: item.id,
        data: name,
      },
    });
    setName("");
    setEditMode(false);
  };

  const onAddItem = () => {
    if (value.length > 0) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          boardId: item.id,
          item: {
            name: value,
          },
        },
      });
      setValue("");
    }
  };

  return (
    <div className="board__nav">
      <div className="board__nav__header">
        {editMode ? (
          <>
            <input
              className="board__nav__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="board__nav__button" onClick={onChangeBoard}>
              Submit
            </button>
          </>
        ) : (
          <>
            <h5 className="board__title">{item.name}</h5>
            <Edit data-testid="changeEditMode" size={20} onClick={() => setEditMode(!editMode)} />
          </>
        )}
      </div>
      <div className="board__nav__new">
        <input
          className="board__nav__input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="board__nav__button" onClick={onAddItem}>
          submit
        </button>
      </div>
    </div>
  );
};

export default Header;
