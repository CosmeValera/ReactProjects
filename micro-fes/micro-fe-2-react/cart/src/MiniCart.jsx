import React, { useEffect, useState } from "react";

import { cart, clearCart } from "./cart";
import { currency } from "home/products";

export default function MiniCart() {
    const [items, setItems] = useState(undefined);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        setItems(cart.value?.cartItems);
        return cart.subscribe((c) => {
            setItems(c?.cartItems);
        });
    }, []);

    if (!items) {
        return null;
    }

    return (
        <>
            <span onClick={() => setShowCart(!showCart)} id="showcart_span">
                <i className="ri-shopping-cart-2-fill text-2xl" id="showcart"></i>
                {items.length}
            </span>
            {showCart && (
                <>
                    <div 
                        className="absolute p-5 border-4 border-blue-800 bg-white rounded-xl text-black"
                        style={{
                            width: 300,
                            top: "2rem",
                            // left: -250,
                        }}
                    >
                        <div 
                            className="grid gap-3 text-sm"
                            style={{
                                gridTemplateColumns: "1fr 3fr 10fr 2fr",
                            }}
                        >
                            {items.map((item)=> (
                                <React.Fragment key={item.id}>
                                    <div>{item.quantity}</div>
                                    <img src={item.image} alt={item.name} className="max-h-6"/>
                                    <div>{item.name}</div>
                                    <div className="text-right">
                                        {currency.format(item.quantity * item.price)}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}