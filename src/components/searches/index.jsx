import "./style.css";
import { useLayoutEffect, useState, useEffect } from "react";
const Search = (props) => {
  // is the function from home getDataFromSearchComponent
  const { getDataFromSearchComponent, apiCalledSuccess, setApiCalledSuccess } =
    props; //props are an object, so object destructuring would be more appropriate.In React, "props" stands for "properties" and refers to the data or functions that a parent component passes down to a child component. Props allow components to communicate and share information. So yes, props can mean data, but they can also include functions

  //hook useState. input value coming from the form input. setInputValue is a function that will update the inputValue and will return the updated state function is called whenever the user types in the search input field. It receives the event object, extracts the current value from the input (event.target.value), and updates the component’s state (inputValue) using setInputValue.
  const [inputValue, setInputValue] = useState(""); // initial value
  //event is the parameter
  const handleInputValue = (event) => {
    // extract the value from event target
    const { value } = event.target;
    // set the updated state
    setInputValue(value);
  };
  console.log(inputValue);

  // pass data to parent component home
  const handleSubmit = (event) => {
    event.preventDefault(); //prevents the default browser behavior of reloading the page
    // calls the function (passed in via props) and provides the current input value as an argument. This allows the parent component to receive and process the search query
    getDataFromSearchComponent(inputValue);
  };

  useEffect(() => {
    if (apiCalledSuccess) {
      setInputValue("");
      setApiCalledSuccess(false);
    }
  }, [apiCalledSuccess]); // dependency array?

  return (
    <form onSubmit={handleSubmit} className="Search">
      {/* call the function handleInputValue on change */}
      <input
        name="search"
        onChange={handleInputValue}
        value={inputValue}
        placeholder="Search Recipes"
        id="search"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
