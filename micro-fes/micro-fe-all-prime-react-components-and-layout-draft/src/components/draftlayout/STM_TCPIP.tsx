
import React from 'react'; 
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import STM_TCPIP_table from './STM_TCPIP_table';

export default function TemplateDemo() {
    const template = (options: PanelHeaderTemplateOptions) => {
        const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
        const className = `${options.className} justify-content-start`;
        const titleClassName = `${options.titleClassName} ml-2 text-primary`;
        const style = { fontSize: '1.25rem' };

        return (
            <div className={className}>
                <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                    <span className={toggleIcon}></span>
                    <Ripple />
                </button>
                <span className={titleClassName} style={style}>TCP-IP KMF Connections</span>
            </div>
        );
    };

    return (
        <Panel headerTemplate={template} toggleable>
            <STM_TCPIP_table />
        </Panel>
    )
}
        