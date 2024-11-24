import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/RecipeDetails.css';

export const RecipeDetails = () => {
    const [recipeInfo, setRecipeInfo] = useState(null); // Initialize with null
    const { recipeid } = useParams();

    useEffect(() => {
        const getRecipeDetailsById = async () => {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeid}`);
            const resInJSON = await res.json();

            // Check if we got a valid meal object and set state accordingly
            if (resInJSON.meals && resInJSON.meals[0]) {
                setRecipeInfo(resInJSON.meals[0]);
                console.log(recipeInfo);
            }
        };

        // Only call the API if recipeid is available
        if (recipeid) {
            getRecipeDetailsById();
        }
    }, [recipeid]); // Dependency on recipeid ensures that the effect runs when the ID changes


    // Conditional rendering
    if (!recipeInfo) {
        return <div>Data Not Found</div>;
    }

    // Function to get all valid ingredients and their measurements
    const getValidIngredientsAndMeasurements = (recipe) => {
        let ingredients = [];
        let measurements = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measurement = recipe[`strMeasure${i}`];
            if (ingredient && measurement) {
                ingredients.push(ingredient);
                measurements.push(measurement);
            }
        }
        return { ingredients, measurements }; // Return as an object
    };

    // Get valid ingredients and measurements
    const { ingredients, measurements } = getValidIngredientsAndMeasurements(recipeInfo);

    return (
        <div className="Recipe-Details">
            <div className="Recipe-Name">{recipeInfo.strMeal}</div>
            <div className="Image-Ingredients-Container">
                <img src={recipeInfo.strMealThumb} alt="Not Available" />
                <div className="Ingredient-Container">
                <p>List of Ingredients</p>
                {/* Ingredients and Measurements */}
                {ingredients.length > 0 ? (
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient} - {measurements[index]} {/* Match ingredient with its measurement */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No ingredients found</p>
                )}
                </div>
            </div>
            <div className="Innstructions-Container">
                <p>Recipe Details</p>
                {recipeInfo.strInstructions}
            </div>
        </div>
    );
};
