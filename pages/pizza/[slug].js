import Layout from "@/components/layout";
import { client, urlFor } from "@/lib/client";
import css from "../../styles/pizza.module.css";
import Image from "next/image";
import leftArrow from "../../assets/arrowLeft.png";
import rightArrow from "../../assets/arrowRight.png";
import { useState } from "react";
import { useStore } from "../../store/store";
import toast, {Toaster} from "react-hot-toast";


export default function Pizza ({pizza}) {

    const src = urlFor(pizza.image).url();

    const [Size, setSize] = useState(1)

    const [Quantity, setQuantity] = useState(1);


    const addPizza = useStore((state) => state.addPizza)
    //Add to cart
    const addToCart = () => {
        addPizza({...pizza, price: pizza.price[Size], quantity: Quantity, size: Size})
        toast.success("Added to cart!");
    }

    

    return(
        <Layout>
            <div className={css.container}>
                <div className={css.imageWrapper}>
                    <Image 
                    loader={() => src}
                    src={src}
                    alt=""
                    layout="fill"
                    unoptimized
                    objectFit="cover"/>
                </div>

                    {/* Right side */}
                <div className={css.right}>
                    <span>{pizza.name}</span>
                    <span>{pizza.details}</span>

                    <span><span style={{color: "var(--themeRed)"}}>$</span> {pizza.price[Size]}</span>
                    <div className={css.size}>
                        <span>Size</span>
                        <div className={css.sizeVariants}>
                            <div
                                onClick={() => setSize(0)}
                                className={Size === 0 ? css.selected : ""}
                            >Small</div>
                            <div
                                onClick={() => setSize(1)}
                                className={Size === 1 ? css.selected : ""}
                            >Medium</div>
                            <div
                                onClick={() => setSize(2)}
                                className={Size === 2 ? css.selected : ""}
                            >Large</div>
                        </div>
                    </div>


                    {/* Quantity */}
                    <div className={css.quantity}>
                        <span>Quantity</span>

                        <div className={css.counter}>
                            <Image src={leftArrow}
                            height={20}
                            width={20}
                            alt=""
                            objectFit="contain"
                            onClick={() => Quantity > 1 ? setQuantity(Quantity-1) : setQuantity(1)}
                            />
                            <span>{Quantity}</span>
                            <Image src={rightArrow}
                            height={20}
                            width={20}
                            alt=""
                            objectFit="contain"
                            onClick={() => setQuantity(Quantity+1)}
                            />
                        </div>
                    </div>


                    {/* Button */}
                    <div className={`btn ${css.btn}`}
                    onClick={addToCart}>
                        Add to Cart
                    </div>

                </div>
                <Toaster/>
            </div>
        </Layout>
    )

}


export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type=="pizza" && defined(slug.current)][].slug.current`
    );

    return {
        paths: paths.map((slug) => ({params: {slug}})),
        fallback: "blocking"
    }

}


export async  function getStaticProps(context) {
    const {slug = ""} = context.params;
    const pizza = await client.fetch(
        `*[_type=="pizza" && slug.current == "${slug}"][0]`
    )
    return {
        props: {
            pizza
        }
    }
}