import { FC, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack, IconButton } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import jsPDF from 'jspdf';
import Recipe from 'models/recipe';

interface ExportProps {
  recipesDetails: Recipe[];
}

const Export: FC<ExportProps> = ({ recipesDetails }) => {
  const exportRef = useRef<HTMLDivElement>(null);

/* function to generate pdf of user's favorite recipes */
 const generatePDF = async () => {
    if (recipesDetails.length > 0) {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const purplePrimary = '#6a1b9a';   
      const purpleSecondary = '#ba68c8'; 
      const margin = 10;
      const lineHeight = 5;
      const imageHeight = 40;
      const borderMargin = 5;

      // border for each page
      pdf.setDrawColor(purplePrimary); 
      pdf.rect(borderMargin, borderMargin, pageWidth - 2 * borderMargin, pageHeight - 2 * borderMargin);
      
      // set font size for each page
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(purplePrimary);
      pdf.setFontSize(22);
      pdf.text('Your Favorite Recipes from Ecowell !', margin, 20);
      
      // Horizontal line below header
      pdf.setDrawColor(purplePrimary);
      pdf.line(margin, 22, pageWidth - margin, 22);
      pdf.setLineWidth(0.5);

      let yOffset = 30;

      // iterate through each recipe
      for (const recipe of recipesDetails) {
          const recipeData = recipe.recipe as any;
          const { label, image, calories, totalNutrients} = recipeData;
          const cuisineType = recipeData.cuisineType;
          const dietLabels = recipeData.dietLabels;
          const  dishType = recipeData.dishType;
          const healthLabels = recipeData.healthLabels;
          const mealType = recipeData.mealType;
          const ingredients = recipeData.ingredientLines;

        // Check for new page
        if (yOffset + imageHeight + lineHeight * 10 > pageHeight) {
          pdf.addPage();
          yOffset = margin;
        }
        pdf.setDrawColor(purplePrimary); 
       pdf.rect(borderMargin, borderMargin, pageWidth - 2 * borderMargin, pageHeight - 2 * borderMargin);

        // Image
        const imgData = await fetch(image);
        const imgBlob = await imgData.blob();
        const imgBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(imgBlob);
        });

        pdf.addImage(imgBase64, 'JPEG', margin, yOffset+12, imageHeight, imageHeight);

        // Recipe Title and Details
        const textXOffset = margin + imageHeight + 5;
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(purpleSecondary);
        pdf.text(label, textXOffset, yOffset + 10);

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(purplePrimary);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Calories: ${calories.toFixed(2)} kcal`, textXOffset, yOffset + 20);
        pdf.text(`Protein: ${totalNutrients.PROCNT.quantity.toFixed(2)} g`, textXOffset, yOffset + 25);
        pdf.setFont("helvetica", "normal");


        // Display extra data
        let extraOffset = yOffset + 30;
        const extraData = [
          { title: "Cuisine Type", data: cuisineType },
          { title: "Diet Labels", data: dietLabels?.join(', ') },
          { title: "Ingredients", data: ingredients?.join(', ') },
          { title: "Dish Type", data: dishType },
          { title: "Meal Type", data: mealType },
          { title: "Health Labels", data: healthLabels?.join(', ') },

        ];

        extraData.forEach((item) => {
          if (item.data) {
            // Set the font to bold for the title
            pdf.setFont("helvetica", "bold");
            const title = `${item.title}: `;
            pdf.text(title, textXOffset, extraOffset);
        
            const titleWidth = pdf.getTextWidth(title);
        
            const splitData = pdf.splitTextToSize(item.data, pageWidth - textXOffset - titleWidth - margin);
        
            pdf.setFont("helvetica", "normal");
        
            if (splitData.length > 0) {
              pdf.text(splitData[0], textXOffset + titleWidth, extraOffset);
            }
        
            for (let i = 1; i < splitData.length; i++) {
              extraOffset += lineHeight;
              pdf.text(splitData[i], textXOffset, extraOffset);
            }
        
            extraOffset += lineHeight;
          }
        });
        yOffset = extraOffset + margin; 
      }

      // save the pdf
      pdf.save('Ecowell_Favorite_Recipes.pdf');
    }
  };

  return (
    <Box
      height="50vh"
      bgcolor="#581845"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      color="white"
      textAlign="center"
      padding="0.5rem"
    >
      <Typography variant="h3" mb={4}>
        Export Details
      </Typography>

      <Stack
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="center"
        mt={4}
        spacing={4}
      >
        <div>
          <Typography variant="h5" mb={4}>
            Need your favorite recipes offline? Download them !!
          </Typography>
          <div style={{ display: 'none' }}>
          <Box ref={exportRef}>
            {/* Layout for PDF */}
            {recipesDetails.map((recipe, index) => (
              <div key={index}>
                <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                <h1>{recipe.recipe.label}</h1>
                <p>Calories: {recipe.recipe.calories.toFixed(2)} kcal</p>
              </div>
            ))}
          </Box>
        </div>
          <IconButton
            color="primary"
            onClick={generatePDF}
            aria-label="download-pdf"
          >
            <SaveAltIcon fontSize="large" />
          </IconButton>
        </div>
      </Stack>
    </Box>
  );
};

export default Export;
