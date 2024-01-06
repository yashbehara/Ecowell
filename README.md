<h2>EcoWell</h2><br>
<img src="docs/images/EcoWellLogo.png">
<b>Team Details: Pace Makers </b><br>
Yashwanth Behera - NUID 002299461 <br>
Sanskruti Manoria - NUID 002643300 <br>
Venkata Deepak Viswanadha - NUID 002299829 <br>
Nikitha Kambhampati - NUID 002272863 <br><br>

<img src="docs/images/Ecowell.png">
EcoWell is a cutting-edge application designed for nutritional analysis of food items, putting the power of information and healthy choices in your hands. Simply input a product's barcode id, and EcoWell seamlessly connects to Open Food APIs, providing detailed nutritional facts and ingredient information. <br><br>

Video link: https://github.com/info-6150-fall-2023/final-project-pace-makers/blob/main/Final%20Project%20Submission%20-%20EcoWell.mp4

<b>Introduction </b> <br>
The goal of our project is to create a comprehensive and user-friendly web application that focuses on promoting health consciousness and well-being. Application focuses on peforming Nutritional Analysis, getting simillar recommendations and recipies. By leveraging a variety of addtional features like language translation ,export help center our application aims to provide users with personalized information, facilitate informed decision-making, and foster a community-driven platform for sharing health-related experiences and tips. <br><br>

<b>UML Diagram</b><br>
<img src="docs/images/EcoWell_UML.jpg">
<br>

<b>Key Features</b> <br>
1. Live application statistics <br>
2. Product Nutritional Analysis and Recommendations <br>
3. Personalized Product Recipes <br>
4. Secure Authentication and Authorization <br>
5. Routes Protection <br>
6. CRUD operations <br>
7. Multilingual support (English, Spanish, French) – Internationalization <br>
8. PWA <br>
9. PDF Download Functionality <br>
10. Profile Analytics <br>
11. Feedback System and Community Portal <br>
12. User friendly interface <br><br>

<b>Technologies Used</b><br>
•Mongo DB<br>
•Express<br>
•Node js<br>
•React<br>
•Redux<br>
•Typescript<br>
•Javascript<br>
•Material UI<br>
•Postman<br><br>

<b>Application Use Cases</b> <br>
•Barcode ID Nutrition Lookup: <br>
Effortlessly retrieve comprehensive nutritional data and ingredients by scanning a product's barcode. <br>
<img src="docs/images/Homepage.png">
 <br>
•Related Products and Favorites:<br>
Discover related products based on your entries and mark your favorites for quick and personalized recommendations. <br>
<img src="docs/images/abc1.png"><br>
•Customised Search on recipies : <br>
Tailor your preferences with filters like vegetarian or no sugar to receive recipe suggestions enriched with essential data such as calories and keywords. 
<img src="docs/images/filter.png"><br> 
•PDF Recipe Downloads: <br>
Conveniently download PDFs of your favorite recipes for easy reference or sharing with friends.
<img src="docs/images/exportRecpie.png">
•Help Center and User Guide:<br>
Navigate the app seamlessly with a detailed user guide available in the Help Center.
<img src="docs/images/helpcenter.png">
•Profile Analytics:<br>
Gain insights into your nutritional habits and preferences through personalized profile analytics based on the data entered during sign-up.
<img src="docs/images/Analytics.png"><br>
•Live App Data:<br>
Stay informed with real-time statistics on the app's usage, including the number of registered users and total available recipes.
<img src="docs/images/FastfActs.png"><br>
•Multilingual Support:<br>
EcoWell supports both English and French languages, ensuring accessibility for a diverse user base.
<img src="docs/images/helpRecomm.png"><br>
•Community Forum and Feedback:<br>
Engage with like-minded users in the community forum, share experiences, and provide valuable feedback to enhance the app's features.<img src="docs/images/abcCom.png"><br>
•Secure Authentication and Authorisation:<br>
Safeguard your data with OAuth authentication, ensuring a secure and reliable login and sign-up process.
<img src="docs/images/login.png"><br><br>

<b>Relatated API References</b><br>
1. Product Information and Nutrition:<br>
    - [Open Food Facts](https://world.openfoodfacts.org/): A database of food products from around the world, including nutritional information.<br>
2. User Authentication:<br>
    - [Auth0](https://auth0.com/): A widely used identity and authentication platform.<br>
3. Dietary Preference:<br>
    - [Edamam Recipe Search API](https://developer.edamam.com/edamam-recipe-api): Provides detailed nutritional information for a given recipe, including whether it's vegetarian or not.<br>
4. Product Recommendation:<br>
    - [Open Food Facts - Product Recommendation API](https://world.openfoodfacts.org/): A database of food products from around the world, including nutritional information.<br><br>


<b>Instructions to run EcoWell</b> <br> 
Backend Connection <br>
• Open terminal, navigate to RESTAPIServices folder  <br>
• in terminal write "npm start" <br>
• It will connect to EcoWell db and will start listening port 5000 <br>
Frontend Connection <br>
• Open terminal, navigate to client folder  <br>
• in terminal write "npm start" <br>
• It will connect to EcoWell and will start listening port 3000 <br><br>

<b>Instructions to use EcoWell Application (User guide)</b><br>
Landing Page<br>
    1. Check the Fast facts section whic displays current dynamic status and report of application.<br>
    2. Login : scroll down to Google sign, enter your email id and password. <br>
    3. Enter your details to the user details page to proceed in the application (sign up)<br>
Home page- personalised page of logged in user<br>
    4. For Nutritional Analysis<br>
     -Enter the Barcode id found on the backside of food product, Click Submit<br>
     -Your will be redirected to product details page with a detailed view of poduct ingredients, nutrinal Facts <br>
    5. For Product Recommendation<br>
    - Conitinuing to above steps, scroll down and click on button- get product recommendations<br>
    - EcoWell will give you list of recommendaed products simillar to the one you entered.<br>
    6. For Filtered search and adding to favourites:<br>
    -Following above, you will get a filter page where you can select the filtes and click on the search button.<br>
    -You will get the filtered list of product with thier nutrient information. <br>
    -You can add them as favourites and get the results on homepage.<br>
    7. Profile Analytics: <br>
    -Back to home page, You can see the dynamic charts giving results based on your profile data and favourite recipies.<br>
    8. Export:<br>
    -Scroll down to export section, You can download the list of favourite reciepes as a pdf.<br>
    9. Community Forum:<br>
    -This section is for user collaboration in the application. Give the list of all the posts made my users of the application.<br>
    -Click on Join button which will be redirecting to community portal page.<br>
    -Click on creat Post to add a new post.<br>
    - A user can update and delete thier own posts only.<br>
    10. Help Center:<br>
    -Scroll down to help center for application user guide.This section focus on three language - French , English and Spanish.<br>
    -Click on acces help center which will redirect to the Help center overview page.<br>
    -You can see each card which leads to different section of application and can read the content in 3 languages.<br>
    11. Update user Profile:<br>
    -Click on the user icon on the top right of the application<br>
    -Select update menu for updating your details.<br>
    12. PWA : Download the application from the google link bar and run offline.<br><br>





  

    





