
import React from 'react'; 
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import NAVPRX_force_fileupload from './NAVPRX_force_fileupload';
import NAVPRX_force_fileupload_advance from './NAVPRX_force_fileupload_advance';
import NAVPRX_force_clear from './NAVPRX_force_clear';

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
                <span className={titleClassName} style={style}>Force</span>
            </div>
        );
    };

    return (
        <Panel headerTemplate={template} toggleable>
            <div className="flex align-items-center">
                <p className="mr-7 pr-2"> OS </p>
                <NAVPRX_force_fileupload />
            </div>
            <div className="flex align-items-center mb-3">
                <p className="mr-6"> GNAV </p>
                <div className='mr-2 '>
                    <NAVPRX_force_fileupload />
                </div>
                <NAVPRX_force_clear />
            </div>
            <div className="flex align-items-center">
                <p className="mr-5"> GNAV9 </p>
                <NAVPRX_force_fileupload_advance />
            </div>
        </Panel>
    )
}
        