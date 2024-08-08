import { useContext } from "react";
import { AppContext } from "./App";
export default function Progressbar() {
  const {
    handleBar,
    handleBtn,
    turn,
    level,
    times,
    btnRef,
    barRef,
    progressRef,
    theme,
  } = useContext(AppContext);
  return (
    <div className="progressbar-game">
      <h1 className="welcome">Chào bạn đến với trò chơi đoán số!</h1>
      <h1 className="turn">
        Bạn còn {turn}/{times} lần thử
      </h1>
      <h1 className="notice">Bạn cần tìm kiếm số từ 1 đến {level}</h1>
      <div className="progress-bar">
        <div
          className="rank r100"
          style={{ color: theme === "light" ? "black" : "white" }}
        >
          100
        </div>
        <div
          className="rank r512"
          style={{ color: theme === "light" ? "black" : "white" }}
        >
          512
        </div>
        <div
          className="rank r1024"
          style={{ color: theme === "light" ? "black" : "white" }}
        >
          1024
        </div>
        <div
          className="rank r1536"
          style={{ color: theme === "light" ? "black" : "white" }}
        >
          1536
        </div>
        <div
          className="rank r2048"
          style={{ color: theme === "light" ? "black" : "white" }}
        >
          2048
        </div>
        <div className="bar" ref={barRef} onMouseDown={handleBar}>
          <div className="progress" ref={progressRef}></div>
          <div
            className="btn"
            ref={btnRef}
            onMouseDown={handleBtn}
            aria-valuemin="5"
            aria-valuemax="2048"
            aria-valuenow={level < 5 ? 5 : level}
            style={{ backgroundColor: theme === "light" ? "black" : "white" }}
          >
            <div className="title-btn">{level < 5 ? 5 : level}</div>
          </div>
        </div>
        <input type="hidden" value={level < 5 ? 5 : level} />
      </div>
    </div>
  );
}
