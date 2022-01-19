import React, { useContext, useEffect } from "react";
import "./App.sass";
import { Board, Navbar, ProgressBar, Wrapper } from "./components";
import { AppContext } from "./context/provider";

interface Props {
  
}

const App:React.FC<Props> = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: "GET_BOARDS" });
  }, []);

  return (
    <div className="container">
      <Navbar title="Board note" />
      <Wrapper>
        {state?.board.map((item, index) => (
          <Board key={index} item={item} />
        ))}
      </Wrapper>
      <ProgressBar />
    </div>
  );
}

export default App;
