export const CLIENT_ID =
  "837522818244-bmla4par1849tegddtjn0sqfvr5vrhci.apps.googleusercontent.com";

export const RECIPES_APP_ID = '4c533df0'

export const RECIPES_API_KEY = '8cb9d699abd70b7aaacacc7fb6d3c648'

export const RECIPES_ACCESS_POINT = ' https://api.edamam.com/api/recipes/v2'


export const APP_ROUTES = {
  LANDING_ROUTE: "/",
  SIGNUP_ROUTE: "/signup",
  HOMEPAGE_ROUTE: "/home",
  PRODUCT_DETAILS_ROUTE: "/product-details",
  PRODUCT_RECOMMENDATIONS: "/product-recommendation",
  UPDATE_PROFILE:"/update-user-profile",
  COMMUNITY_FORUM_ROUTE: "/community-forum",
  HELP_CENTER_ROUTE:"/help-center",
  HELP_CENTER_ROUTE_PRODUCTANALYSIS:"/help-product-analysis",
  RECIPES_PAGE_ROUTE: "/recipes",
};

export const BACKEND_HOST = {
  LOCAL_HOST: "http://localhost:5000",
};
export const BACKEND_PATHS = {
  USER_DETAILS: "/user-details",
};

export const FORM_DATA_MODEL = {
  Age: "",
  Height: "",
  Weight: "",
  BP_Upper_Limit: "",
  BP_Lower_Limit: "",
  Sugar_Upper_Limit: "",
  Sugar_Lower_Limit: "",
  Skeletal_Mass:"",
  Fat_Mass:"",
  Water_Mass:"",
  Intended_Sugar_Limit:"",
  Intended_Fat_Limit:"",
  Intended_Protein_Limit:""
};

export const SAMPLE_RECOMMEDED_PRODUCT={
  title:'Name1',
  imgUrl:'../assets/nutella_image.jpeg',
  fatP:'10%',
  calories:'500cal',
  category:'bread-spreads'
}


export const HELP_CENTER_CARDS = [
  {
    title: 'Check Product Nutritional Analysis',
    cardColor: '#77dd77',
    description: "Nutritional analysis critically evaluates food's health impact. It examines key nutrients like proteins and fats, providing essential insights into overall nutritional value. This helps in making informed, balanced dietary choices for a healthy lifestyle.",
    routeParam: 'product-analysis'
  },
  {
    title: 'Access Product Recommendations',
    cardColor: '#6CB4EE',
    description: "Personalized recommendations enhance shopping experiences. Leveraging user preferences and behavior, the app suggests suitable products. This strategy boosts user satisfaction, engagement, and likelihood of successful, tailored purchases.",
    routeParam: 'product-recommendations'
  },
  {
    title: 'Adding Your Favourite Recipes',
    cardColor: '#FFD580',
    description: "Add favorite recipes, creating a hub for culinary inspiration. This feature fosters a community of food enthusiasts, encouraging exploration of diverse flavors and cooking styles, and transforming the app into a resource for home cooks.",
    routeParam: 'favourite-recipes'
  },
  {
    title: 'Exporting Your Details',
    cardColor: '#FFB6C1',
    description: "Export your data effortlessly for privacy and compliance with data protection. This feature ensures secure management of personal details, fostering trust and a positive user experience, and maintaining control over personal information.",
    routeParam: 'export-details'
  },
  {
    title: 'Using Community Forum',
    cardColor: '#CF9FFF',
    description: "The community forum fosters user engagement and knowledge sharing. It provides a space for users to connect, exchange ideas, and seek advice, turning the app into a collaborative platform for shared interests and discussions.",
    routeParam: 'community-forum'
  },
  {
    title: 'User Profile Settings',
    cardColor: '#942874',
    description: "Profile settings customize the app experience. Users can adjust preferences and personal details, optimizing the app for individual needs. This feature enhances usability and user satisfaction by offering personalization flexibility.",
    routeParam: 'user-profile'
  },
];
