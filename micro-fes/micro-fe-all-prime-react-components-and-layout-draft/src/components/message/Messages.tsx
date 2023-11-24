
import React, { useEffect, useRef } from 'react'; 
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';

export default function SeverityDemo() {
    const msgs = useRef<Messages>(null);

    useMountEffect(() => {
        msgs.current?.clear();
        msgs.current?.show([
            {sticky: true, severity: 'info', summary: 'Info', detail: 'Message Content'},
            {sticky: true, severity: 'success', summary: 'Success', detail: 'Message Content'},
            {sticky: true, severity: 'warn', summary: 'Warning', detail: 'Message Content'},
            {sticky: true, severity: 'error', summary: 'Error', detail: 'Message Content'}
        ]);
    });

    return (
        <Messages ref={msgs} />
    )
}
        