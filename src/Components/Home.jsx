import React from "react";
import toast from "react-hot-toast";
import img1 from "../assets/i.jpg";
import img2 from "../assets/k.jpg";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer";

const Home = () => {
  const productList = [
    { name: "iphone", price: 1222, imgSrc: img1, id: "kdlslfksfjsdjfs" },
    { name: "bike", price: 240000, imgSrc: img2, id: "slfjlfdlskjls" },
  ];

  const dispatch = useDispatch();

  const addToCartHandler = (options) => {
    dispatch(addToCart(options));
    toast.success("added to cart");
  };
  return (
    <div className="Home">
      {productList.map((i) => (
        <ProductCard
          key={i.id}
          imgSrc={i.imgSrc}
          name={i.name}
          price={i.price}
          id={i.id}
          handler={addToCartHandler}
        />
      ))}
      ;
    </div>
  );
};

const ProductCard = ({ name, id, imgSrc, price, handler }) => (
  <div className="productCard">
    <img src={imgSrc} alt={name} />
    <p>{name}</p>
    <h4>${price}</h4>
    <button onClick={() => handler({ name, imgSrc, price, id, quantity: 1 })}>
      Add to Cart
    </button>
  </div>
);
export default Home;
