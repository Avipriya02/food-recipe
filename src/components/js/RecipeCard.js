import React from "react";
import '../css/RecipeList.css';
import { NavLink } from "react-router-dom";

export const RecipeCard = ({ detail }) => {
    return (

        <div className="RecipeList">
            {!detail ? "":
                detail.map((data) => {
                    return (
                        <div className="Recipe-Card-Structure">
                            <img src={data.strMealThumb} alt="Not Available"/>
                            <p>{data.strMeal}</p>
                            <NavLink to={`/${data.idMeal}`}> <button>View Recipe</button></NavLink> 
                        </div>
                    )

                })
            }
        </div>

    )
}