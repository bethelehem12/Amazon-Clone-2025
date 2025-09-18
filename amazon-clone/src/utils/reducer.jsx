
import { Type } from "./action.type";
export const initialState = {
  basket: []
}

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      return {
        ...state,
        basket:[...state.basket,action.item]
      }
     

      default:
        return state;
  }
};

// useReducer hook requires reducer and initialState
// const [state, dispatch] = useReducer(reducer, initialState)
