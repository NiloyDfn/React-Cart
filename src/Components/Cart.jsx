import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement , deleteHandler,calculatePrice } from "../redux/reducer"; 

const Cart = () => {
  const { cartItems } = useSelector(state => state.cart); 
  const { subTotal,shipping,tax, total} = useSelector(state => state.cart)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems, dispatch]);

  return (
    <div className="cart">
      <main>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((i)=> (
            <CartItem
              key={i.id}
              imgSrc={i.imgSrc}
              name={i.name}
              price={i.price}
              qty={i.quantity}
              id={i.id}
              increment={(id) => dispatch(increment(id))} 
              decrement={(id) => dispatch(decrement(id))} 
              deleteHandler ={(id) => dispatch(deleteHandler(id))}
            />
          ))
        ) : (
          <h1>no items found</h1>
        )}
      </main>

      <aside>
        <h2>Subtotal: ${subTotal} </h2>
        <h2>Shipping: ${shipping}</h2>
        <h2>Tax: ${tax}</h2>
        <h2>Total: ${total}</h2>
      </aside>
    </div>
  );
};

const CartItem = ({ imgSrc, name, price, qty, id, increment, decrement,deleteHandler }) => (
  <div className="cartItem">
    <img src={imgSrc} alt="Item" />
    <article>
      <h3>{name}</h3>
      <p>${price}</p>
    </article>

    <div>
      <button onClick={() => decrement(id)}>-</button>
      <p className="text-black ">{qty}</p>
      <button onClick={() =>  increment(id)}>+</button>
    </div>
    <MdDelete onClick={() => deleteHandler(id)} />

  </div>
);

export default Cart;

