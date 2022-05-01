import { Add, Remove } from "@mui/icons-material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useRecoilValue } from "recoil";
import productState from "../../store/Products/atom";
import { CreateCartAPI } from "../../store/Cart/atom";
import "./Cart.css";

function Cart() {
  const products = useRecoilValue(productState);
  const { cart, increaseQty, reduceQty, removeFromCart } = CreateCartAPI();

  return (
    <>
      <Navbar />  
          <div className="Info">
            <hr />
            {cart.map(({ id, qty }) => {
              const product = products.find((p) => p.id === id);

              if (!product) {
                console.warn(`pages/Cart: Didn't find product with ID ${id}`);
                return null;
              }

              return (
                <div className="Product" key={product.id}>                
                    <img src={product.image} className="Image"/>              
                      {product.title}
                      <DeleteOutlineRoundedIcon
                        onClick={() => removeFromCart(product.id)}
                      />
                      <Add  onClick={() => increaseQty(id)} />
                      <div className="ProductAmount">{qty}</div>
                      <Remove onClick={() => reduceQty(id)}/>                   
                     $ {product.price}                 
                </div>
              );
            })}
          </div>
    </>
  );
}

export default Cart;
