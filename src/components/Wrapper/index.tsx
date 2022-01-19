import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { AppContext } from "../../context/provider";

interface Props {}

const Wrapper: React.FC<Props> = (props) => {
  const { children } = props;
  const { dispatch } = useContext(AppContext);

  return (
    <div className="content_wrapper">
      <DragDropContext
        onDragEnd={(result) =>
          dispatch({
            type: "SET_BOARDS",
            payload: result,
          })
        }
      >
        {children}
      </DragDropContext>
    </div>
  );
};

export default Wrapper;
