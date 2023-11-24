
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from './service/ProductService';

interface Product {
    name: string;
    id: string;
    prime1: string;
    backup1: string;
    prime2: boolean;
    backup2: string;
}

export default function BasicDemo() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // ProductService.getProductsMini().then(data => setProducts(data));
        setProducts([
            {
                name: 'M-KMF',
                id: '1000',
                prime1: 'Product Description',
                backup1: 'bamboo-watch.jpg',
                prime2: true,
                backup2: 'Accessories',
            },
            {
                name: 'P-KMF',
                id: '1001',
                prime1: 'Product Description',
                backup1: 'bamboo-watch.jpg',
                prime2: false,
                backup2: 'Accessories',
            },
            {
                name: 'GCS-KMF',
                id: '1002',
                prime1: 'Product Description',
                backup1: 'bamboo-watch.jpg',
                prime2: true,
                backup2: 'Accessories',
            },
        ])
    }, []);

    return (
        <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header=""></Column>
                <Column field="prime1" header="GCC-1 PRIME"></Column>
                <Column field="backup1" header="GCC-1 BACKUP"></Column>
                <Column field="prime2" header="GCC-2 PRIME"></Column>
                <Column field="backup2" header="GCC-2 BACKUP"></Column>
            </DataTable>
        </div>
    );
}
        