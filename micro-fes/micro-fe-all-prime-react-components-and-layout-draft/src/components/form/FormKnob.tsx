
import React, { useState } from "react";
import { Knob, KnobChangeEvent } from 'primereact/knob';

export default function BasicDemo() {
    const [value, setValue] = useState<number>(0);

    return (
        <div className="card flex justify-content-center">
            <Knob value={value} onChange={(e: KnobChangeEvent) => setValue(e.value)} />
        </div>
    )
}
        