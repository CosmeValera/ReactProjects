
import React from 'react'; 
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import ToggleEnable from './ToggleEnable';

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
            <div className="flex align-items-center">
                <p className='mr-8'>M-KMF data channel</p>
                <ToggleEnable />
            </div>
            <div className="flex align-items-center">
                <p className='mr-8'>P-KMF data channel</p>
                <ToggleEnable />
            </div>
            <div className="flex align-items-center">
                <p className='mr-8'>GCS-KMF data channel</p>
                <ToggleEnable />
            </div>
        </Panel>
    )
}
        