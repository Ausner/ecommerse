import Layout from "@/components/layout";
import { urlFor } from "@/lib/client";
import { useStore } from "@/store/store";
import css from "../styles/cart.module.css";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import OrderModal from "@/components/order-modal";
import  { useRouter } from "next/router";

export default function Cart () {
    const router = useRouter();
    const CartData = useStore((state) =>state.cart);
    const removePizza = useStore((state) => state.removePizza);
    const [PaymentMethod, setPaymentMethod] = useState(null);
    const [Order, setOrder] = useState(
        typeof window !== "undefined" && localStorage.getItem("order")
    )

    const handleRemove = (i) => {
        removePizza(i);
        toast.error("Item Removed!")
    }


    const total = () => CartData.pizzas.reduce((a, b) =>a+b.quantity * b.price, 0);

    const handleOnDelivery = () => {
        setPaymentMethod(0);
        typeof window !== "undefined" && localStorage.setItem("total", total());
    }


    const handleCheckOut = async () => {
        typeof window !== "undefined" && localStorage.setItem("total", total());
        setPaymentMethod(1);
        const response = await fetch('api/stripe', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(CartData.pizzas),
        });

        if (response.status === 500) {
            return;
        }

        const data = await response.json();
        toast.loading("Redirecting...");
        console.log("DATA: ", data);
        router.push(data.url);
    }

    return (
        <Layout>
            <div className={css.container}>

                {/* details */}
                <div className={css.details}>
                    <table className={css.table}>
                        <thead>
                            <th>Pizza</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </thead>
                        <tbody className={css.tbody}>
                            {CartData.pizzas.map((pizza, i) => {
                                const src = urlFor(pizza.image).url();
                                return (
                                <tr key={i}>
                                    <td 
                                    className={css.imageTd}>
                                        <Image
                                        loader={() => src}
                                        src={src}
                                        alt=""
                                        objectFit="cover"
                                        width={85}
                                        height={85}
                                        />
                                    </td>

                                    <td>
                                        {pizza.name}
                                    </td>

                                    <td>
                                        { pizza.size === 0 ? "Small" : pizza.size === 1 ? "Medium" : "Large" }
                                    </td>

                                    <td>
                                        {pizza.price}
                                    </td>

                                    <td>
                                        {pizza.quantity}
                                    </td>

                                    <td>
                                        {pizza.price * pizza.quantity}
                                    </td>

                                    <td style={{color: "var(--themeRed)",
                                cursor: "pointer"}}
                                onClick={() => handleRemove(i)}>
                                        ❌
                                    </td>
                                </tr>
                                
                            )})
                            }
                        </tbody>
                    </table>

                </div>

                {/* summary */}
                <div className={css.cart}>
                    <span>Cart</span>
                    <div className={css.CartDetails}>
                        <div>
                            <span>Items</span>
                            <span>{CartData.pizzas.lenght}</span>
                        </div>

                        <div>
                            <span>Total</span>
                            <span>$ {total()}</span>
                        </div>
                    </div>


                    {/* {!Order ? ( */} 
                        <div className={css.buttons}>
                        <button className="btn" onClick={handleOnDelivery}>Pay on Delivery</button>
                        <button className="btn" onClick={handleCheckOut}>Pay Now</button>
                    </div>
                    {/* ) : null} */}
                    

                </div>

            </div>
            <Toaster/>
            {/* modal */}
            <OrderModal style={{marginTop: '10px'}}
            opened={PaymentMethod === 0}
            setOpened = {setPaymentMethod}
            PaymentMethod  = {PaymentMethod}
            />
        </Layout>
    )


}