import React from 'react';
import { Panel } from 'primereact/panel';
import { classNames } from 'primereact/utils';

export default function PanelPassThrough() {
    return (
        <div className="card">
            <Panel
                header="Header"
                toggleable
                pt={{
                    header: ({ state }) => ({
                        id: 'myPanelHeader',
                        style: {
                            'user-select': 'none'
                        },
                        className: classNames('border-primary', {
                            'bg-primary': state.collapsed,
                            'bg-primary-reverse': !state.collapsed
                        })
                    }),
                    content: { className: 'border-primary text-lg text-primary-700' },
                    title: { className: 'text-xl' },
                    toggler: { className: 'bg-primary hover:bg-primary-reverse' },
                }}
            >
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </Panel>
        </div>
    )
}
