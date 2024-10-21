import { createContext, useState } from "react";
import { postApiData } from "./../helpers/postApiData";
import { CartRoutes } from "../routes/cartRoutes";
import toast from "react-hot-toast";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
    const [itemsCount , setItemNumber] = useState(0)
 async function addCart(productId) {
    
    let body = {
      productId: productId,
    };

    let token = localStorage.getItem("userToken");    

    const {status , message , data} = await postApiData(CartRoutes.ADD_TO_CART, body, { token: token });
    
    if(status === 200)
    {        
        setItemNumber(data.numOfCartItems)
        toast.success(message, {
          duration: 5000,
          position: 'top-right',
          icon: '🛒',
          iconTheme: {
            primary: 'green',
            secondary: 'white',
          },
          style: {
            color: 'green',
          },
        })
    }

  }

  return (
    <CartContext.Provider value={{ addCart, itemsCount }}>{children}</CartContext.Provider>
  );
}
