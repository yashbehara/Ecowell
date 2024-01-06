import React from "react";
import "./RecipeFilter.css";

/* Interface for RecipeFilter component props */
export interface FiltersComponentProps {
  onApplyFilters: (filters: RecipeFilters) => void;
}

/* Interface for RecipeFilter component */
export interface RecipeFilters {
  diet: string[];
  health: string[];
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
}

const initialFiltersState: RecipeFilters = {
  diet: [],
  health: [],
  cuisineType: [],
  mealType: [],
  dishType: [],
};

/* Recipe Filter component to provision user to filter recipes based on preferences */
const RecipeFilter: React.FC<FiltersComponentProps> = ({ onApplyFilters }) => {
  const [filters, setFilters] =
    React.useState<RecipeFilters>(initialFiltersState);

  const toggleFilter = (category: keyof RecipeFilters, filter: string) => {
    setFilters((prevFilters) => {
      const currentFilters = prevFilters[category];
      const filterIndex = currentFilters.indexOf(filter);
      if (filterIndex === -1) {
        return { ...prevFilters, [category]: [...currentFilters, filter] };
      } else {
        return {
          ...prevFilters,
          [category]: currentFilters.filter((f) => f !== filter),
        };
      }
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  //recipe filter component
  return (
    <div className="filters-container">
      {/* Health filters section */}
      <div className="filters-section">
        <h3>Allergies</h3>
        {[
          "alcohol-cocktail",
          "alcohol-free",
          "celery-free",
          "crustacean-free",
          "dairy-free",
          "DASH",
          "egg-free",
          "fish-free",
          "fodmap-free",
          "gluten-free",
          "immuno-supportive",
          "keto-friendly",
          "kidney-friendly",
          "kosher",
          "low-fat-abs",
          "low-potassium",
          "low-sugar",
          "lupine-free",
          "Mediterranean",
          "mollusk-free",
          "mustard-free",
          "no-oil-added",
          "paleo",
          "peanut-free",
          "pescatarian",
          "pork-free",
          "red-meat-free",
          "sesame-free",
          "shellfish-free",
          "soy-free",
          "sugar-conscious",
          "sulfite-free",
          "tree-nut-free",
          "vegan",
          "vegetarian",
          "wheat-free",
        ].map((filter) => (
          <div className="filter-option" key={filter}>
            <label>
              {filter}
              <input
                type="checkbox"
                checked={filters.health.includes(filter)}
                onChange={() => toggleFilter("health", filter)}
                style={{ marginLeft: "10px" }}
              />
            </label>
          </div>
        ))}
      </div>
      {/* Diets filters section */}
      <div className="filters-section">
        <h3>Diets</h3>
        {[
          "balanced",
          "high-fiber",
          "high-protein",
          "low-carb",
          "low-fat",
          "low-sodium",
        ].map((filter) => (
          <div className="filter-option" key={filter}>
            <label>
              {filter.replace(/-/g, " ")}
              <input
                type="checkbox"
                checked={filters.diet.includes(filter)}
                onChange={() => toggleFilter("diet", filter)}
                style={{ marginLeft: "10px" }}
              />
            </label>
          </div>
        ))}
      </div>
      {/* Cuisine type*/}
      <div className="filters-section">
        <h3>Cuisine Type</h3>
        {[
          "American",
          "Asian",
          "British",
          "Caribbean",
          "Central Europe",
          "Chinese",
          "Eastern Europe",
          "French",
          "Indian",
          "Italian",
          "Japanese",
          "Kosher",
          "Mediterranean",
          "Mexican",
          "Middle Eastern",
          "Nordic",
          "South American",
          "South East Asian",
        ].map((filter) => (
          <div className="filter-option" key={filter}>
            <label>
              {filter.replace(/-/g, " ")}
              <input
                type="checkbox"
                checked={filters.cuisineType.includes(filter)}
                onChange={() => toggleFilter("cuisineType", filter)}
                style={{ marginLeft: "10px" }}
              />
            </label>
          </div>
        ))}
      </div>
      {/* Meal type*/}
      <div className="filters-section">
        <h3>Meal Type</h3>
        {["Breakfast", "Dinner", "Lunch", "Snack", "Teatime"].map((filter) => (
          <div className="filter-option" key={filter}>
            <label>
              {filter.replace(/-/g, " ")}
              <input
                type="checkbox"
                checked={filters.mealType.includes(filter)}
                onChange={() => toggleFilter("mealType", filter)}
                style={{ marginLeft: "10px" }}
              />
            </label>
          </div>
        ))}
      </div>
      {/* Dish type*/}
      <div className="filters-section">
        <h3>Dish Type</h3>
        {[
          "Biscuits and cookies",
          "Bread",
          "Cereals",
          "Condiments and sauces",
          "Desserts",
          "Drinks",
          "Main course",
          "Pancake",
          "Preps",
          "Preserve",
          "Salad",
          "Sandwiches",
          "Side dish",
          "Soup",
          "Starter",
          "Sweets",
        ].map((filter) => (
          <div className="filter-option" key={filter}>
            <label>
              {filter.replace(/-/g, " ")}
              <input
                type="checkbox"
                checked={filters.dishType.includes(filter)}
                onChange={() => toggleFilter("dishType", filter)}
                style={{ marginLeft: "10px" }}
              />
            </label>
          </div>
        ))}
      </div>
      <button
        style={{ width: "150px" }}
        className="search-button"
        onClick={handleApplyFilters}
      >
        SEARCH
      </button>
    </div>
  );
};

export default RecipeFilter;
