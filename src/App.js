import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "./components/CartItems";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";
let isFirstRender = true;
// console.log("top");
function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);
  // const cartItems = useSelector((state) => state.cart.itemList);
  // console.log(cartItems);

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      

      return;
    }
    const sendReq = async () => {
      //send state as sending request
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request",
          type: "warning",
        })
      );
      const res = await fetch(
        "https://redux-shopping-cart-17e26-default-rtdb.firebaseio.com/CartItems.json",
        {
          method: "Put",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      //send state as request is successfu;;
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sent Request to Database",
          type: "success",
        })
      );
    };
    sendReq().catch((err) => {
      //send state as error
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request to Database Failed",
          type: "error",
        })
      );
    });
  }, [cart]);

  return (
    <div className="App">
      {
        notification && (
          <Notification
            type={notification.type}
            message={notification.message}
          />
        )
        // console.log("end");
      }
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
