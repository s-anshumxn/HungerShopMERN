import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext=createContext();
const CartDispatchContext=createContext();

const reducer = (state,action)=>{
    switch(action.type){
        case "ADD":
            return [...state,{id : action.id , name:action.name ,qty:action.qty , size:action.size , price: action.price , img:action.img}]
        
        case "REMOVE":
            let newArr=[...state]
            newArr.splice(action.index ,1)//delete val of index which is supplied by frontend
            return newArr;
        
        case "UPDATE":
            return state.map((food) =>
                food.id === action.id
                    ? {
                          ...food,
                          qty: food.qty + parseInt(action.qty), // Add the new quantity
                          price: food.price + action.price,     // Update the price accordingly
                      }
                    : food
            );
        case "DROP" :
            let empArray= []
            return empArray
        default:
            console.log("error in reducer");

    }
}

export const CartProvider = ({children})=>{
    const [state,dispatch] =useReducer(reducer,[])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )

}

export const useCart = ()=> useContext(CartStateContext);
export const useDispatchCart= ()=> useContext(CartDispatchContext);
