/* Interface for Product Info */
interface ProductInfo {
    status_verbose: string
    product: {
        categories: any,
        image_url: any,
        ingredients: any,
        nutrient_levels: any,
        nutriments: any,
        nutriscore_data: any,
        product_name: any,
        product_quantity: any,
        nutriscore_grade: any
    }
}

export default ProductInfo;