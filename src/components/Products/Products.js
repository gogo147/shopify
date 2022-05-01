import React from "react";
import { useRecoilValue } from "recoil";
import productState from "../../store/Products/atom";
import "./Products.css";
import { Link } from "react-router-dom";

function Products() {
  const products = useRecoilValue(productState);

  return (
    <div className='Cont'>
      {products.map((product) => {
        return (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div className="ProductCont">
              <img src={product.image} className="pic"/>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Products;
