import { useContext } from "react";
import "./style.css";
import { ThemeContext } from "../../App";
import "./style.css";

import Homepage from "../../pages/home";

const ThemeButton = () => {
  // consume the context use hook useContext
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    // if this is true the above one will be false?
    <button
      style={theme ? { backgroundColor: "#12343b" } : {}}
      onClick={() => setTheme(!theme)}
      className="themeButton"
    >
      {" "}
      Change Theme
    </button>
  );
};

export default ThemeButton;
