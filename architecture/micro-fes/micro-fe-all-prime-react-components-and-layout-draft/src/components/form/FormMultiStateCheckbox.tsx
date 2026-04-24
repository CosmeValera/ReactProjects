
import React, { useState } from "react";
import { MultiStateCheckbox, MultiStateCheckboxChangeEvent } from 'primereact/multistatecheckbox';

interface Item {
    value: string;
    icon: string;
}

export default function BasicDemo() {
    const [value, setValue] = useState<string>('public');
    const options: Item[] = [
        { value: 'public', icon: 'pi pi-globe' },
        { value: 'protected', icon: 'pi pi-lock-open' },
        { value: 'private', icon: 'pi pi-lock' }
    ];

    return (
        <div className="card flex flex-column align-items-center gap-3">
            <MultiStateCheckbox value={value} onChange={(e: MultiStateCheckboxChangeEvent) => setValue(e.value)} options={options} optionValue="value" />
            <span>{value || 'no value'}</span>
        </div>
    );
}
        