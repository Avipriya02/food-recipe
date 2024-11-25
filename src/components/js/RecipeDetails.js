import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/RecipeDetails.css';

export const RecipeDetails = () => {
    const [recipeInfo, setRecipeInfo] = useState(null); // Initialize with null
    const { recipeid } = useParams();
    const [err, setErr] = useState(false);
    const[loading,setLoading] = useState(false);

    useEffect(() => {
        const getRecipeDetailsById = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeid}`);
                const resInJSON = await res.json();

                // Check if we got a valid meal object and set state accordingly
                if (resInJSON.meals && resInJSON.meals[0]) {
                    setRecipeInfo(resInJSON.meals[0]);
                    console.log(resInJSON.meals[0]);
                } else {
                    setErr(true); // Set error if no meal found
                }
            } catch (error) {
                setErr(true); // Handle any fetch errors
                console.error("Error fetching recipe details:", error);
            }
            finally{
                setLoading(false);
            }
        };

        // Only call the API if recipeid is available
        if (recipeid) {
            getRecipeDetailsById();
        }
    }, [recipeid]); // Dependency on recipeid ensures that the effect runs when the ID changes

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

    // Get valid ingredients and measurements if recipeInfo is available
    const { ingredients, measurements } = recipeInfo ? getValidIngredientsAndMeasurements(recipeInfo) : { ingredients: [], measurements: [] };

    return (
        <>
            {loading && <h4 className="sub-heading">Content is loading...</h4>}
            {err && <h4 className="sub-heading">Recipe Details not found. Please go back.</h4>}

            {/* Display Recipe Details if recipeInfo is fetched */}
            {recipeInfo && (
                <div className="Recipe-Details">
                    <div className="Recipe-Name">{recipeInfo.strMeal}</div>
                    <div className="Image-Ingredients-Container">
                        <img src={recipeInfo.strMealThumb} alt="Recipe Thumbnail" />
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
                    <div className="Instructions-Container">
                        <div className="Recipe-Name">Recipe Details</div>
                        <p>{recipeInfo.strInstructions}</p>
                    </div>
                </div>
            )}
        </>
    );
};
