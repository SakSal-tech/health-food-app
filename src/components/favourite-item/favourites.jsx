import "./style.css";
const FavouriteItem = (props) => {
  //extract these 3 from props. This called object destructuring  way to access specific properties from an object without writing props.id, props.image, etc. every time.
  const { id, image, title, removeFromFavourites } = props;
  console.log(props, "recipe-item-props");

  return (
    // every item should be unique that is why id. This is not the array indexes as React doc says that using id keys as array index will decrease performance
    <div className="favourite-item">
      <div>
        <img
          src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
          alt="image of recipe"
        />{" "}
      </div>
      <p>{title}</p>
      <button type="button" onClick={removeFromFavourites}>
        Remove favourites
      </button>
    </div>
  );
};

export default FavouriteItem;
