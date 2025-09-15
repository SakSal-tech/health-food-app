import ThemeButton from "../theme-button/theme";
import "./style.css";
import { useContext } from "react";
import { ThemeContext } from "../../App";

const RecipeItem = (props) => {
  //extract these 3 from props. This called object destructuring  way to access specific properties from an object without writing props.id, props.image, etc. every time.
  const { id, image, title, addToFavourites } = props;
  // use ThemeContext correctly
  const { theme } = useContext(ThemeContext);
  console.log(props, "recipe-item-props");
  return (
    <div className="recipe-item">
      <div>
        <img
          src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
          alt="image of recipe"
        />
      </div>
      <p>{title}</p>
      <button type="button" onClick={addToFavourites}>
        Add to favourites
      </button>
    </div>
  );
};

export default RecipeItem;
