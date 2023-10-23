
import React from 'react';
import { InputText } from 'primereact/inputtext';

export default function PositionDemo() {
    return (
        <div className="card flex flex-wrap justify-content-center gap-2">
            <InputText type="text" placeholder="Right" tooltip="Enter your username" />
            <InputText type="text" placeholder="Top" tooltip="Enter your username" tooltipOptions={{ position: 'top' }} />
            <InputText type="text" placeholder="Bottom" tooltip="Enter your username" tooltipOptions={{ position: 'bottom' }} />
            <InputText type="text" placeholder="Left" tooltip="Enter your username" tooltipOptions={{ position: 'left' }} />
            <InputText type="text" placeholder="Mouse" tooltip="Enter your username" tooltipOptions={{ position: 'mouse' }} />
        </div>
    );
}
        