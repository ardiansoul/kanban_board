import { useContext } from "react";
import { AppContext } from "../../context/provider";

export const progress = (current: number, total: number) => {
  let progress = (current * 100) / total;
  if (isNaN(progress)) progress = 0;
  return progress.toString() + "%";
};

const ProgressBar = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="progress__wrapper">
      <div
        className="progress__slide"
        style={{
          width: progress(
            state?.board[state.board.length - 1]?.items.length
              ? state?.board[state.board.length - 1]?.items.length
              : 0,
            state?.count ? state?.count : 0
          ),
        }}
      ></div>
      <div className="progress__count">
        <span className="progress__count__text">
          {state?.board[state.board.length - 1]?.items.length
            ? state?.board[state.board.length - 1]?.items.length
            : 0}{" "}
          / {state?.count}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
