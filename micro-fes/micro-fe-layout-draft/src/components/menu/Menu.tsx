
import React from 'react'; 
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

export default function BasicDemo() {
    let items: MenuItem[] = [
        {label: 'New', icon: 'pi pi-fw pi-plus'},
        {label: 'Delete', icon: 'pi pi-fw pi-trash'}
    ];

    return (
        <Menu model={items} />
    )
}
        