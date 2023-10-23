
import React from 'react';
import { Chip } from 'primereact/chip';

export default function IconDemo() {
    return (
        <div className="card flex flex-wrap gap-2">
            <Chip label="Apple" icon="pi pi-apple" />
            <Chip label="Facebook" icon="pi pi-facebook" />
            <Chip label="Google" icon="pi pi-google" />
            <Chip label="Microsoft" icon="pi pi-microsoft" removable />
        </div>
    );
}
        