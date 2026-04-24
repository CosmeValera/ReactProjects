import { useRef } from "react";
import { useMyContext } from "../../application/provider";

export default function LogIn() {
    const nom = useRef<HTMLInputElement>(null);
    const ape = useRef<HTMLInputElement>(null);

    const [state, setState] = useMyContext();

    return (
        <>
            <input
                type="text"
                ref={nom}
                onChange={() => {
                    setState({ ...state, name: nom.current!.value });
                }}
            />
            <input
                type="text"
                ref={ape}
                onChange={() => {
                    setState({ ...state, surnames: ape.current!.value });
                }}
            />
        </>
    );
}
