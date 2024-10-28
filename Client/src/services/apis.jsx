

const API_URL = `https://websitehub-vki3.onrender.com/api`;


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

 