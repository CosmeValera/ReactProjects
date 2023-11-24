
import React, { useRef } from 'react';
import { StyleClass } from 'primereact/styleclass';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function AnimationsDoc() {
    const openBtnRef = useRef<Button>(null);
    const closeBtnRef = useRef<Button>(null);

    return (
        <div className="card flex flex-column align-items-center">
            <div>
                <StyleClass nodeRef={openBtnRef} selector=".box" enterClassName="hidden" enterActiveClassName="fadein">
                    <Button ref={openBtnRef} label="Show" className="mr-2" />
                </StyleClass>

                <StyleClass nodeRef={closeBtnRef} selector=".box" leaveActiveClassName="fadeout" leaveToClassName="hidden">
                    <Button ref={closeBtnRef} label="Hide" />
                </StyleClass>
            </div>

            <div className="hidden animation-duration-500 box">
                <div className="flex bg-green-500 text-white align-items-center justify-content-center py-3 border-round-md mt-3 font-bold shadow-2 w-8rem h-8rem">Content</div>
            </div>
        </div>
    );
}
        