import { useContext } from "react";
import { CartValue } from '../../state/CartState';

function ProductTest(props) {
    const { cart, setCart } = useContext(CartValue);

    return (
        <>
            <h1>Halo!</h1>
            <h1>{cart}</h1>
            <button onClick={() => setCart(cart-1)}>-</button>
            <button onClick={() => setCart(cart+1)}>+</button>
        </>
    )
}

export default ProductTest;