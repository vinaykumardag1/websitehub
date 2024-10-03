import axios from "axios";

const API_URL = `http://localhost:4000/api`;


export const webhubapi = async () => {
    try {
      const response = await fetch(API_URL);
      if(!response.ok){
        throw new Error("fetching failed")
      }
      const products=await response.json()
      return products
    } catch (error) {
      
      console.error("Error fetching data:", error);
    }
  };

  
export  const api_category = async () => {
    try {
      const response = await axios.get(`${API_URL}/:${category}`);
      setApiData(response.data);  
      console.log(response.data);
    } catch (error) {
      setError("Error fetching data by category");
      console.error("Error fetching data:", error);
    }
  };

  