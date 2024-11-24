import React, { useState } from "react";
import '../css/HomePage.css'
import { RecipeCard } from "./RecipeCard";

const HomePage = () => {
    const [data, setData] = useState();
    const [query, setQuery] = useState();
    const searchQuery = (e) => {
        setQuery(e.target.value);
    }
    const apicallFunction = async() => {
        const getAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const convertDataToJSON = await getAPI.json();
        console.log(convertDataToJSON.meals);
        setData(convertDataToJSON.meals);
    }
    console.log(query);
    console.log(data);
    return (
        <>
            <h1 className="head-home-page">Cook & Eat Food Recipe App!</h1>
            <h4 className="sub-heading">Search Your Recipes Here</h4>
            <div className="searchBar">
                <input type="text" placeholder="Search for a recipe" onChange={searchQuery}></input>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" onClick={apicallFunction}>
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </div>
            <div>
                <RecipeCard detail = {data}/>
            </div>
        </>
    )

}
export default HomePage