import ProductInfo from "./productInfoModel";

/* Interface for Product Recommendations */
interface ProductRecommendation {
    count: number
    page: number
    page_count: number
    page_size: number
    products: ProductInfo["product"][];
    skip: number
}

export default ProductRecommendation;
