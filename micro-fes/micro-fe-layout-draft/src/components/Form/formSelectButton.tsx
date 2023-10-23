
import React, { useState } from "react";
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';

export default function BasicDemo() {
    const options: string[] = ['Off', 'On'];
    const [value, setValue] = useState<string>(options[0]);

    return (
        <div className="card flex justify-content-center">
            <SelectButton value={value} onChange={(e: SelectButtonChangeEvent) => setValue(e.value)} options={options} />
        </div>
    );
}
        