import { atom, useRecoilState } from "recoil";
import { saveToLocalStorage } from "../../utility/localStorage";

export const cartState = atom({
  key: "cartState",
  default: [],
});

export default cartState;

export function CreateCartAPI() {
  const [cart, setCart] = useRecoilState(cartState);

  function addToCart(id, qty = 1) {
    const product = cart.find((p) => p.id === id);

    if (product) {
      const oldCartState = cart.filter((p) => p.id !== id);
      setCart([
        ...oldCartState,
        {
          id: id,
          qty: product.qty + qty,
        },
      ]);
      saveToLocalStorage("cart",[
        ...oldCartState,
        {
          id: id,
          qty: product.qty + qty,
        },
      ]);
      return;
    }
    setCart([...cart, { id, qty }]);
    saveToLocalStorage("cart",[...cart, { id, qty }]);
  }

  function reduceQty(id) {
    const product = cart.find((p) => p.id === id);
    const oldQty = cart.filter((p) => p.id !== id);
    const newQty = [
      ...oldQty,
      { id, qty: product.qty > 1 ? product.qty - 1 : product.qty },
    ];
    setCart(newQty);
    saveToLocalStorage("cart",newQty);
  }

  function increaseQty(id) {
    const product = cart.find((p) => p.id === id);
    const oldQty = cart.filter((p) => p.id !== id);
    const newQty = [...oldQty, { id, qty: product.qty + 1 }];
    setCart(newQty);
    saveToLocalStorage("cart",newQty);
  }

  function removeFromCart(id) {
    const newCartState = cart.filter((p) => p.id !== id);
    setCart(newCartState);
    saveToLocalStorage("cart",newCartState);
  }

  return {
    cart,
    addToCart,
    reduceQty,
    increaseQty,
    removeFromCart,
  };
}
