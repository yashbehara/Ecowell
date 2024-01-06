/* Interface for Recipes model*/
interface Recipe {
  recipe: {
    label: string;
    image: string;
    healthLabels: string[];
    yield: number;
    totalNutrients: {
      PROCNT: { quantity: number };
      FAT: { quantity: number };
      CHOCDF: { quantity: number };
    };
    calories: number;
    uri: string;
  };
}
export default Recipe;
