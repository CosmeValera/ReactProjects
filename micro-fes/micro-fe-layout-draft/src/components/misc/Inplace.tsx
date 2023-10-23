
import React from 'react';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

export default function ImageDemo() {
    return (
        <Inplace>
            <InplaceDisplay>
                <span className="inline-flex align-items-center">
                    <span className="pi pi-image"></span>
                    <span className="ml-2">View Picture</span>
                </span>
            </InplaceDisplay>
            <InplaceContent>
                <img className="w-full" alt="Nature" src="https://primefaces.org/cdn/primereact/images/nature/nature1.jpg" />
            </InplaceContent>
        </Inplace>
    );
}
        