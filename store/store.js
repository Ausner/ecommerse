import {create} from "zustand";


export const useStore = create(
    (set) => ({

        //CART
        cart: {
            pizzas: []
        },



        //PIZZA
        addPizza: (data) =>
        set ((state) => ({
            cart: {
                pizzas: [...state.cart.pizzas, data]
            }
        })),


        //REMOVE ITEM
        removePizza : (index) =>
        set((state) => ({
            cart: {
                pizzas: state.cart.pizzas.filter((_, i) => i !=index)
            }
        })),



        //RESET CART - USUALLY CALLED AFTER PAY OR CLEAN THE CART
        resetCart: () =>
        set(() => ({
            cart: {
                pizzas: []
            }
        }))

    })
)