import { useRef } from 'react';
import { useMyContext } from "../../application/provider"

export default function LogIn () {
    const nom = useRef<HTMLInputElement>(null);

    const [state, setState] = useMyContext();

    return (
        <input type="text" ref={nom}
        onChange={() => { 
            setState({name: nom.current!.value})}} />
    )
}