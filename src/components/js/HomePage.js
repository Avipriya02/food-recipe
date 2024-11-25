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
                <input type="text" placeholder="Search Recipes Here" onChange={searchQuery}></input>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search searchbtn" viewBox="0 0 16 16" onClick={apicallFunction}>
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </div>
            {load && <h4 className="sub-heading">The Content is loading...</h4>}
            {error && <h4 className="sub-heading">Recipe not found. Please try a different search.</h4>}
            {!data &&
                <>
                    <div className="Home_Page-Cover-Photos">
                        <img src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1910&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Not Available" className="Cover-Image" />
                        <img src="https://images.unsplash.com/photo-1508737804141-4c3b688e2546?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Not Availble" className="Cover-Image" />
                        <img src="https://images.unsplash.com/photo-1663059364204-e33b6bb49cc5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Not Available" className="Cover-Image" />
                    </div><div className="Home_Page-Cover-Photos">
                        <img src="https://images.unsplash.com/photo-1633424411336-f5b7a6886d88?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Not Available" className="Cover-Image" />
                        <img src="https://images.unsplash.com/photo-1512223792601-592a9809eed4?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Not Availble" className="Cover-Image" />
                        <img src="https://images.unsplash.com/photo-1512223792601-592a9809eed4?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Not Availble" className="Cover-Image" />
                    </div>
                </>
            }


            <div>
                <RecipeCard detail={data} />
            </div>
        </>
    )

}
export default HomePage