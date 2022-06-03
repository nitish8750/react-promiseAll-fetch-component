import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";

const productsAPI = "https://fakestoreapi.com/products";
const usersAPI = "https://fakestoreapi.com/users";
const cartsAPI = "https://fakestoreapi.com/carts";

export default function App() {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState("");
  const [productData, setProductData] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStoreData = async () => {
    setLoading(true);
    try {
      const res = await Promise.allSettled([
        axios.get(productsAPI),
        axios.get(usersAPI),
        axios.get(cartsAPI)
      ]);
      setProductData(res[0].value.data);
      setUserData(res[1].value.data);
      setCartData(res[2].value.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("tjhis is rerro" + e.message);
    }
  };

  const getUserData = (userId) => {
    return userData.find((user) => user.id === userId).username;
  };

  const getCartData = (userId) => {
    return cartData.find((user) => user.userId === userId).products;
  };

  const getProductName = (id) => {
    return productData.find((product) => product.id === id).title;
  };

  useEffect(() => {
    getStoreData();
  }, []);

  useEffect(() => {
    if (userData) {
      setUserName(getUserData(1));
      const products = getCartData(1);
      const productDetails = products.map((product) => {
        const productName = getProductName(product.productId);
        return {
          name: productName,
          ...product
        };
      });
      console.log(productDetails);
      setProductDetails(productDetails);
    }
  }, [userData]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {loading ? (
        "this is loadin"
      ) : (
        <ul>
          {productDetails.map((product) => (
            <li>
              {userName} has added {product.name} for {product.quantity}
            </li>
          ))}
        </ul>
      )}

      <p> </p>
    </div>
  );
}
