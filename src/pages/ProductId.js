import React, { useState } from "react";
import "./ProductId.css";
import Navbar from "../components/Navbar/Navbar";
import productState from "../store/Products/atom";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { CreateCartAPI } from "../store/Cart/atom";

function ProductId() {
  const params = useParams();
  const products = useRecoilValue(productState);
  const product = products.find((p) => p.id === parseInt(params.productId));
  
  const { addToCart } = CreateCartAPI();

  const [qty, setQty] = useState(1);

  function handleReduceQty() {
    if (qty > 1) {
      setQty(qty - 1);
      return;
    }
    setQty(1);
  }

  function handleAddToQty() {
    setQty(qty + 1);
  }

  return (
    <>
      <Navbar />
      <div className="Wrapper">
        <div className="ImageContainer">
          <img src={product.image} className="Image"/>
        </div>
        <div className="InfoContainer">
          <div className="Title">{product.title}</div>
          {product.description}
          <div className="Price">{product.price}</div>
         
          <div className="AddContainer">
            <div className="AmountContainer">
              <div onClick={handleReduceQty}>-</div>
              <div className="Amount">{qty}</div>
              <div onClick={handleAddToQty}>+</div>
            </div>

            <div className="Button" onClick={() => addToCart(product.id, qty)}>
              Add To Cart
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductId;