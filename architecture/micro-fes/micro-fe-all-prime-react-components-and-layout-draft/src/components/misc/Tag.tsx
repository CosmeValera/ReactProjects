
import React from 'react';
import { Tag } from 'primereact/tag';

export default function IconDemo() {
    return (
        <div className="card">
            <Tag className="mr-2" icon="pi pi-user" value="Primary"></Tag>
            <Tag className="mr-2" icon="pi pi-check" severity="success" value="Success"></Tag>
            <Tag className="mr-2" icon="pi pi-info-circle" severity="info" value="Info"></Tag>
            <Tag className="mr-2" icon="pi pi-exclamation-triangle" severity="warning" value="Warning"></Tag>
            <Tag icon="pi pi-times" severity="danger" value="Danger"></Tag>
        </div>
    );
}
        