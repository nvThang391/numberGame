import Playerinput from "./Playerinput";
import Progressbar from "./Progressbar";
import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import "./assets/style/App.css";
export const AppContext = createContext();
export default function App() {
  const barRef = useRef();
  const progressRef = useRef();
  const btnRef = useRef();
  //

  let offsetX = useRef(0);
  let initialOffSetX = useRef(0);
  let clientXStart = useRef(0);
  let clientXEnd = useRef(0);
  let positionSpace = useRef(0);
  let inputRef = useRef();
  let formRef = useRef();
  //

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [turn, setTurn] = useState();
  const [level, setLevel] = useState(5);
  const [times, setTimes] = useState(3);
  const [result, setResult] = useState();
  const [notice, setNotice] = useState();
  const [noticeStatus, setNoticeStatus] = useState(false);
  // const [playeranswer, setPlayeranswer] = useState([]);
  localStorage.setItem("theme", theme);
  const handleBar = (e) => {
    e.stopPropagation();
    let clientWidthBar = barRef.current.clientWidth;
    offsetX.current = e.nativeEvent.offsetX;
    initialOffSetX.current = offsetX.current;
    const rate = (offsetX.current / clientWidthBar) * 100;
    progressRef.current.style.width = `${rate}%`;
    btnRef.current.style.left = `${rate}%`;
    clientXStart.current = e.clientX;
    setLevel(
      Math.round((rate <= 0.244140625 ? 0.244140625 : rate) * (2048 / 100))
    );
    setNoticeStatus(false);
    handleReset();
    document.addEventListener("mousemove", handleMove);
  };
  const handleBtn = (e) => {
    e.stopPropagation();
    clientXStart.current = e.clientX;
    initialOffSetX.current = offsetX.current;
    document.addEventListener("mousemove", handleMove);
  };
  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", handleMove);
  });
  const handleMove = (e) => {
    clientXEnd.current = e.clientX;
    positionSpace.current = clientXEnd.current - clientXStart.current;
    offsetX.current = positionSpace.current + initialOffSetX.current;
    let clientWidthBar = barRef.current.clientWidth;
    let rate = (offsetX.current / clientWidthBar) * 100;
    if (rate >= 100) {
      rate = 100;
    }
    if (rate <= 0) {
      rate = 0;
    }
    setLevel(
      Math.round((rate <= 0.244140625 ? 0.244140625 : rate) * (2048 / 100))
    );
    setNoticeStatus(false);
    handleReset();
    progressRef.current.style.width = `${rate}%`;
    btnRef.current.style.left = `${rate}%`;
  };
  const handleCreateResult = (Math.randomInt = function (level) {
    return Math.floor(Math.random() * (level - 5)) + 5;
  });
  const handleMaxTime = (level) => {
    const RANGE_NUMBER = level;
    const MAX_TIME = Math.ceil(Math.log2(RANGE_NUMBER));
    return MAX_TIME;
  };
  useEffect(() => {
    setNoticeStatus(false);
    setTimes(handleMaxTime(level));
    setTurn(handleMaxTime(level));
    setResult(handleCreateResult(level));
    inputRef.current.focus();
  }, [level]);

  console.log(result);
  //
  const handleSendNumber = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const number = formData.get("number");
    setTurn(turn - 1);
    if (turn === 0) {
      setTurn(0);
    }
    if (number > level || number < 1) {
      setNotice(`Vui lòng nhập số trong khoảng 1 - ${level}`);
    } else {
      if (number > result) {
        setNotice("Bạn cần giảm xuống một chút");
      } else if (number < result) {
        setNotice("Bạn cần tăng lên một chút");
      } else {
        setNotice("Chính xác, chúc mừng bạn đã đoán đúng");
        setNoticeStatus(true);
      }
    }
  };
  const handleReset = () => {
    formRef.current.reset();
    setNotice("");
    setTimes(handleMaxTime(level));
    setTurn(handleMaxTime(level));
    setNoticeStatus(false);
    setResult(handleCreateResult(level));
    inputRef.current.focus();
  };
  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <AppContext.Provider
      value={{
        handleBar,
        handleBtn,
        handleSendNumber,
        handleReset,
        turn,
        level,
        times,
        btnRef,
        barRef,
        progressRef,
        inputRef,
        formRef,
        notice,
        noticeStatus,
        theme,
        setTheme,
      }}
    >
      <div className={theme === "light" ? "app-game" : "dark app-game"}>
        <div
          className="theme-btn"
          onClick={handleChangeTheme}
          style={{
            backgroundColor: theme === "light" ? "black" : "white",
          }}
        ></div>
        <Progressbar />
        <Playerinput />
      </div>
    </AppContext.Provider>
  );
}
