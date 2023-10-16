import { useMyContext } from "../../application/provider"

export default function ShowState() {
    const [state, setState] = useMyContext();
    return ( <p>{state.name}</p>)
}