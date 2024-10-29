import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Navbar from "../Navbar";
import Footer from "./Footer";
import Loading from "./Loading";

const API_URL = `https://websitehub-vki3.onrender.com/api`;

const CategorySelector = () => {
  const [category, setCategory] = useState(""); // Stores selected category
  const [apiData, setApiData] = useState([]); // Stores API data
  const [error, setError] = useState(""); // Error handling

 
  useEffect(() => {
    if (category) {
      const fetchCategoryData = async () => {
        try {
          const response = await axios.get(`${API_URL}/${category}`);
          setApiData(response.data);
          
        } catch (error) {
          setError("Error fetching data by category");
          console.error("Error fetching data:", error);
        }
      };

      fetchCategoryData();
    }
  }, [category]); 
  if (!apiData) {
    return <Loading/>
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
        <Navbar/>
    <div className="container mx-auto">
     
      <h1 className="text-red-700 text-3xl text-center">Select a Category</h1>
      <div className="flex justify-center py-6">
        <select onChange={handleCategoryChange} className="p-4 my-7 rounded-xl ">
                   <option value="">-Select Category-</option>
                    <option value="education">Education</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="technology">Technology</option>
                    <option value="health">Health</option>
                    <option value="ai">Aritificial Intellegence</option>
                    <option value="coding">Coding</option>
                    <option value="editing">Editing</option>
                    <option value="socialmedia">Social Media</option>
                    <option value="news">News</option>
                    <option value="travel">Travel</option>
                    <option value="government">Government</option>
                    <option value="course">Course</option>
                    <option value="e_commerce">Ecommerce</option>
                    <option value="others">Other</option>
              </select>
        </div>
      {error && <p>{error}</p>}
      
      <div>
        {apiData.length > 0 ? (
          <div className="grid gap-9 grid-cols-3 ">
            {apiData.map((item,index) => (
             <Card item={item} key={index}/>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-4xl text-yellow-600">
           Data is not availbale in this category 
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CategorySelector;
