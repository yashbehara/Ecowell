import ProductInfo from "models/productInfoModel";
import * as restService from "../services/baseService";
import ProductRecommendation from "models/productRecommendationModel";

interface QueryParams {
  action: string;
  tagtype_0: string;
  tag_contains_0: string;
  tag_0: string;
  tagtype_1: string;
  tag_contains_1: string;
  tag_1: string;
  json: boolean;
}

const productDetailsURL = new URL("https://us.openfoodfacts.org/cgi/search.pl");

/* Service to fetch product recommendations */
export const getProductRecommendationsData = async (
  category: string
): Promise<ProductRecommendation> => {
  const queryParams: QueryParams = {
    action: "process",
    tagtype_0: "categories",
    tag_contains_0: "contains",
    tag_0: category,
    tagtype_1: "nutrition_grades",
    tag_contains_1: "contains",
    tag_1: "A",
    json: true,
  };

  Object.entries(queryParams).forEach(([key, value]) =>
    productDetailsURL.searchParams.append(key, value.toString())
  );
  const response = await fetch(productDetailsURL.toString(), {
    method: "GET",
  });

  const data = await response.json();
  return data;
};
