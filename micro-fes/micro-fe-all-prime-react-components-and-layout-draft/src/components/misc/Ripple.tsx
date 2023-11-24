
import React from 'react';
import { Ripple } from 'primereact/ripple';

export default function BasicDemo() {
    return (
        <div className="card flex justify-content-center align-items-center">
            <div className="bg-primary flex select-none justify-content-center align-items-center shadow-2 border-round p-6 font-bold p-ripple">
                Click Me
                <Ripple />
            </div>
        </div>
    );
}
        