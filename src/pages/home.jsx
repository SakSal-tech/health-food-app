import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import Search from "../components/searches";
import "./style.css";
import RecipeItem from "../components/recipe-item/recipe";
import FavouriteItem from "../components/favourite-item/favourites";

const reducer = (state, action) => {
  switch (action.type) {
    case "value":
    case "filterFavourites":
      return { ...state, filteredValue: action.value };
    default:
      return state;
  }
};
const initialState = {
  filteredValue: "",
};

// Accept ThemeButton as a prop
const Homepage = (props) => {
  const { ThemeButton } = props;
  // loading state
  const [loadingState, setLoading] = useState(false);

  // save results that recieved from api
  const [recipes, setRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);

  // state for api is success or not
  const [apiCalledSuccess, setApiCalledSuccess] = useState(false);

  //use reducer functionality
  const [state, dispatch] = useReducer(reducer, initialState);

  // get data from child component Search
  const getDataFromSearchComponent = (getData) => {
    // keep the loading state as true before calling the api
    setLoading(true);
    console.log(getData, "getData");

    //calling the api
    const url = `https://api.apilayer.com/spoonacular/food/ingredients/search?query=${getData}`;
    var myHeaders = new Headers();
    myHeaders.append("apikey", "6uTpT69UhnPUqtjc29zXxXJnN1GKR5qY");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    {
      /*An asynchronous function (declared with async) is a function that can perform tasks that take time to complete, such as fetching data from an API, without blocking the rest of your program. This helps keep your app responsive while handling slow operations like network requests*/
    }
    async function getRecipes() {
      try {
        // await keyword makes the function wait until the response comes back. async/await → fetches API data without blocking UI.
        const response = await fetch(url, requestOptions);
        const result = await response.json(); //converted from JSON to a JavaScript object using await response.json(). response.json() takes the JSON data from the API response and converts it into a JavaScript object.
        console.log(result);
        const { results } = result;
        if (results && results.length > 0) {
          setRecipes(results);
          setApiCalledSuccess(true);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    }
    getRecipes();
  };
  console.log(loadingState, recipes, "loadingState, recipes");

  // Wrapped addToFavourites in useCallback to prevent it from being re-created on every render.
  // This fixes the react-hooks/exhaustive-deps warning when used as a dependency in other hooks.
  //useCallback is used so that React remembers this function instead of recreating it every time the component re-renders. Dependency [favourites] means: only recreate the function if favourites changes.
  // Why useCallBack? In React, functions inside a component are redefined every time the component re-renders.It tells React Hey React, don’t recreate this function every render. Keep the old one unless its dependencies change.” What pieces of state or props does this function depend on?” If nothing in the array changes → React reuses the old function. If something in the array changes → React rebuilds the function. “addToFavourites depends on the current favourites list.” If favourites change (like you add/remove one), React creates a new version of the function. If only loadingState or recipes change → React reuses the old function.

  const addToFavourites = useCallback(
    (getCurrentRecipeItem) => {
      console.log(getCurrentRecipeItem);
      let cpyFavourites = [...favourites]; //Make a copy of the current favourites array.
      const index = cpyFavourites.findIndex(
        (item) => item.id === getCurrentRecipeItem.id //Check if the recipe is already in favourites. If it finds nothing → it returns -1.
      );
      console.log(index);
      // -1 not found
      if (index === -1) {
        cpyFavourites.push(getCurrentRecipeItem); // add it to fav
        setFavourites(cpyFavourites);
        localStorage.setItem("favourites", JSON.stringify(cpyFavourites));
        window.scrollTo({ top: "0", behavior: "smooth" });
      } else {
        alert("Item is already present in favourites");
      }
    },
    [favourites]
  );
  {
    /*filter creates a new array that only includes items where the condition is true. In this case, it keeps all items whose id is NOT equal to getCurrentId. So, the item with id === getCurrentId is excluded (removed) from the new array. Then, you update the state and localStorage with this new array, so the item is effectively removed from favourites. */
  }
  const removeFromFavourites = (getCurrentId) => {
    let cpyFavourites = [...favourites];
    cpyFavourites = cpyFavourites.filter((item) => item.id !== getCurrentId);

    setFavourites(cpyFavourites);
    localStorage.setItem("favourites", JSON.stringify(cpyFavourites));
  };
  console.log(favourites);
  // dependency
  useEffect(() => {
    const extraFavouritesFromLocalStorgaeOnPageLoad = JSON.parse(
      localStorage.getItem("favourites")
    );
    setFavourites(extraFavouritesFromLocalStorgaeOnPageLoad || []);
  }, []);
  console.log(state, "filteredState");

  // filter the favourites
  const filteredFavouritesItems = favourites.filter(
    (item) => item.name && item.name.toLowerCase().includes(state.filteredValue)
  );

  // when ever the is a change in any of the dependencies this function should be called?
  const renderRecipes = useCallback(() => {
    if (recipes && recipes.length > 0) {
      return recipes.map((item, index) => (
        <RecipeItem
          key={item.id || index}
          addToFavourites={() => addToFavourites(item)} // add the whole item to the list
          id={item.id}
          image={item.image}
          title={item.name}
        />
      ));
    } else {
      return null;
    }
  }, [recipes, addToFavourites]); // recipes as dependency

  return (
    <div className="homepage">
      {/* Place ThemeButton next to Search in a flex row */}
      {/* Centered row for Search, ThemeButton, and input */}
      <div className="search-row">
        <Search
          getDataFromSearchComponent={getDataFromSearchComponent}
          apiCalledSuccess={apiCalledSuccess}
          setApiCalledSuccess={setApiCalledSuccess}
        />
        {ThemeButton}
      </div>

      {/* show favourites items */}
      <div className="favourites-wrapper">
        <h1 className="favourites-title">Favourites</h1>
        <div className="search-favourites">
          <input
            onChange={(event) =>
              dispatch({ type: "filterFavourites", value: event.target.value })
            } // dispatch certain action to reducer
            value={state.filteredValue}
            name="searchFavourites"
            placeholder="Search Favourites"
          />
        </div>

        <div className="favourites">
          {!filteredFavouritesItems.length && (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
              className="no-items"
            >
              {" "}
              No favourites are found
            </div>
          )}
          {filteredFavouritesItems && filteredFavouritesItems.length > 0
            ? filteredFavouritesItems.map((item) => (
                <FavouriteItem
                  removeFromFavourites={() => removeFromFavourites(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.name}
                />
              ))
            : null}
        </div>
      </div>

      {/* show loading state If loadingState is true, then show the <div>.*  && is not AND it just means then/}
      {loadingState && (
        <div className="loading"> Loading recipes ! Please it. </div>
      )}
      {/* show loading state This means you are rendering a RecipeItem component for each item in the recipes array. You are passing two props to each RecipeItem:

key={index}: The key prop is required by React when rendering lists. It helps React identify which items have changed, are added, or are removed. Using index is common, but if your data has a unique ID, it's better to use that.
data={item}: This passes the actual recipe data (item) to the RecipeItem component so it can display the details.
You do not need to use the index inside your RecipeItem unless you want to. The key prop is only for React's internal use when rendering lists. The important prop for your component is data={item}.
 */}
      <div className="items">
        {/*renderRecipes()*/}

        {useMemo(
          () =>
            !loadingState && recipes && recipes.length > 0
              ? recipes.map((item, index) => (
                  <RecipeItem
                    key={item.id || index}
                    addToFavourites={() => addToFavourites(item)} // add the whole item to the list
                    id={item.id}
                    image={item.image}
                    title={item.name}
                  />
                ))
              : null,
          [loadingState, recipes, addToFavourites]
        )}
      </div>

      {/* there is no data so have to render */}
      {!loadingState && !recipes.length && (
        <div className="no-items"> No Recipes are found </div>
      )}
    </div>
  );
};

export default Homepage;
