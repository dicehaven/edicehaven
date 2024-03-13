import React,{useState} from 'react';
import productData from "../products.json";


const title = (
    <h2>Explore the Board Game World!</h2>
)
const desc = "We have the largest collections of boardgames!"


const Banner = () => {
    return <div className="banner-section style-4">
            <div className="container">
                <div className="banner-content">
                    {title}
                    <form>
                        <input type="text" name="search" id="search" placeholder="Search your board game" 
                        ></input>
                    </form>
                    <p>{desc}</p>
                </div>
            </div>
        </div>
};

export default Banner
