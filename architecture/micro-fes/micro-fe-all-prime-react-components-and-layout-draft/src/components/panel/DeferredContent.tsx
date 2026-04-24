
import React, { useState, useRef } from 'react';
import { DeferredContent } from 'primereact/deferredcontent';
import { Toast } from 'primereact/toast';

export default function BasicDemo() {
    const toast = useRef<Toast | null>(null);

    const onImageLoad = () => {
        toast.current!.show({ severity: 'success', summary: 'Success', detail: 'Image loaded' });
    };

    return (
        <div className="card">
            <p style={{marginBottom: '70rem', textAlign: 'center'}}>Scroll down to lazy load an image.</p>
            <Toast ref={toast} />
            <DeferredContent onLoad={onImageLoad}>
                <img className="w-full md:w-30rem md:block md:mx-auto" src="https://primefaces.org/cdn/primereact/images/galleria/galleria3.jpg" alt="Prime" />
            </DeferredContent>
        </div>
    )
}
        