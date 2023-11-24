
import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';

export default function BasicDemo() {
    const items: MenuItem[] = [
        {label: 'Status'},
        {label: 'Uplink Config.'},
        {label: 'Release/PTV/CEV Config.'},
        {label: 'Miscellaneous'},
        {label: 'Mission Interface'},
        {label: 'Authentication'},
        {label: 'Help', icon: 'pi pi-fw pi-cog'},
        {label: 'Exit', icon: 'pi pi-fw pi-cog'},
    ];

    return (
        <div className="card">
            <TabMenu model={items} />
        </div>
    )
}
        