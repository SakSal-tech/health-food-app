
import React, { createContext, useState } from "react";
import './App.css'
import Homepage from "./pages/home";
import ThemeButton from "./components/theme-button/theme";


// Start with function keyword/arrow function component name shoud start with capital
// You should have component body(jsx) + component logic
// export the component to use outside

// create context in the root level so every child can access
export const ThemeContext = createContext(null);



// arrow function
function App() {

  // change colour when ever the theme state is 
  const [theme, setTheme] = useState(false);

  return (
    // provide context
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* Add dark-theme class when theme is true */}
      <div className={`App${theme ? ' dark-theme' : ''}`}>
        <Homepage ThemeButton={<ThemeButton />} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
