import React, { useState, useEffect } from 'react';

import { getProducts, currency } from "./products";

export default function HomeContent() {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts().then(setProducts)
    }, []);

    return <div className="grid grid-cols-4 gap-5">
        {products.map((product) => (
            <div key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="flex">
                    <div className="flex-grow font-bold">
                        <a href="">{product.name}</a>
                    </div>
                    <div className="flex-end">{currency.format(product.price)}</div>
                </div>
                <div className="text-sm mt-4">{product.description}</div>
            </div>
        ))}
    </div>
}