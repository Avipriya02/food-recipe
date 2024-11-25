import React, { useState } from "react";
import '../css/HomePage.css'
import { RecipeCard } from "./RecipeCard";

const HomePage = () => {
    const [data, setData] = useState(null);
    const [query, setQuery] = useState("");
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const searchQuery = (e) => {
        setError(false);
        setQuery(e.target.value);
    }
    const apicallFunction = async () => {
        if (!query) {
            setError(true);
            return;
        }
        try {
            setLoad(true);
            const getAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const convertDataToJSON = await getAPI.json();
            // Check if meals are found
            if (!convertDataToJSON.meals || convertDataToJSON.meals.length === 0) {
                setError(true);
                setData(null); // Ensure data is cleared if no meals are found
            } else {
                setData(convertDataToJSON.meals);
            }
        }
        catch (err) {
            setError(true);  // In case of API error
        } 
        finally {
            setLoad(false);
        }
    }
    return (
        <>
            <h1 className="head-home-page">Cook & Eat Food Recipe App!</h1>
            <h4 className="sub-heading">Search Your Recipes Here</h4>
            <div className="searchBar">
                <input type="text" placeholder="Search for a recipe" onChange={searchQuery}></input>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search searchbtn" viewBox="0 0 16 16" onClick={apicallFunction}>
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </div>
            {error && <h4 className="sub-heading">Recipe not found. Please try a different search.</h4>}
            {load && <h4 className="sub-heading">The Content is loading...</h4>}
            <div>
                <RecipeCard detail={data} />
            </div>
        </>
    )

}
export default HomePage