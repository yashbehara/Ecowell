import ProductInfo from "models/productInfoModel";
import * as restService from "../services/baseService";

const productDetailsURL = "https://world.openfoodfacts.org/api/v0/product/";

/* Service to fetch product details */
export const getProductData = async <T>(
  productId: any
): Promise<ProductInfo> => {
  const response = await fetch(`${productDetailsURL}${productId}`, {
    method: "GET",
  });
  const data: ProductInfo = await response.json();
  return data;
};
