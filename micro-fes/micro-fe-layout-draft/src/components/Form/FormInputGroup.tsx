
import React from 'react'; 
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

export default function BasicDemo() {
    return (
        <div className="card flex flex-column md:flex-row gap-3">
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span>
                <InputText placeholder="Username" />
            </div>

            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">$</span>
                <InputNumber placeholder="Price" />
                <span className="p-inputgroup-addon">.00</span>
            </div>

            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">www</span>
                <InputText placeholder="Website" />
            </div>
        </div>
    )
}
        