import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

/* Favourites component */
const Favourites: FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]); 
  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]);

  return (
    <Box>
      <Box mt={4}>
        <Typography variant="h4" mb={4} textAlign="center" color="green">
          Favourites
        </Typography>
        <Box display="flex" flexDirection="row">
          {favoriteRecipes.map((recipe, index) => (
            <Card sx={{ margin: 'auto', maxWidth: 600 }} key={index}>
              <CardContent>
                <Typography variant="h5" mb={2} textAlign="center" color="green">
                  {recipe.label}
                </Typography>
                <img src={recipe.image} alt={recipe.label} style={{ maxWidth: '100%' }} />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Favourites;
