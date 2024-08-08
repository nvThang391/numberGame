import { useContext } from "react";
import { AppContext } from "./App";
export default function Playerinput() {
  const {
    handleSendNumber,
    handleReset,
    notice,
    noticeStatus,
    turn,
    inputRef,
    formRef,
    theme,
  } = useContext(AppContext);
  return (
    <div className="playerinput-game">
      <form id="formnumber" onSubmit={handleSendNumber} ref={formRef}>
        <div>
          <h3>Hãy nhập vào ô dưới đây:</h3>
          <input
            type="number"
            name="number"
            placeholder="Thử nhập 1 số"
            disabled={turn === 0 ? true : false}
            ref={inputRef}
            style={{
              color: theme === "light" ? "black" : "white",
              backgroundColor: theme === "light" ? "white" : "transparent",
            }}
          />
          <h3
            style={{
              color: noticeStatus ? "green" : "red",
              margin: "10px 0",
            }}
          >
            {notice}
          </h3>
        </div>
      </form>
      {(turn === 0 || noticeStatus) && (
        <button onClick={handleReset}>Chơi lại</button>
      )}
    </div>
  );
}
