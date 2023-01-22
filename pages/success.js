import Layout from "@/components/layout";
import OrderModal from "@/components/order-modal";

export default function Success () {
    return (
        <Layout>
            <OrderModal opened={true} PaymentMethod={1} />
        </Layout>
    )
}