import React, { useState, useEffect } from "react";
import { api } from "../services/api";
 
import Header from "../components/Header";
import Main from "../components/Main";

// Sample data for products
const products = [
  { id: 1, name: "Soccer Ball", price: 29.99, image: "soccer-ball.jpg" },
  { id: 2, name: "Tennis Racket", price: 89.99, image: "tennis-racket.jpg" },
  { id: 3, name: "Basketball", price: 24.99, image: "basketball.jpg" },
  { id: 4, name: "Running Shoes", price: 59.99, image: "running-shoes.jpg" },
];

const HomePage = () => { 

  const [productList, setProductList] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/products");
        const products = response.data;

        console.log("Products:", products);
        
        // Fetch images for each product
        const productsWithImages = await Promise.all(
          products.map(async (product) => {
            const imageResponse = await api.get(`${api.defaults.baseURL}/files/${product.img_src}`);
            setImage(imageResponse.data);
            // console.log("Image Response:", imageResponse.data);
            return { ...product, img: image[product.code] };
          })
        );
        console.log("Products with Images:", productsWithImages);
  
        setProductList(productsWithImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Main className="px-20 py-8">
        <h2 className="text-2xl font-semibold mb-4">Produtos disponíveis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productList.map(product => (
            <div key={product.code} className="border p-4 rounded shadow">
              <img src={image[1]} alt={product.img_src} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-lg font-medium text-gray-700">R${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </Main>
    </>
  );
};

export default HomePage;