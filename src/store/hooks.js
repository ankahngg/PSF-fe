import Context from "./Context";
import { useContext } from "react";

const useStore = () => {
    const [state,dispatch] = useContext(Context);

    return [state,dispatch];
}

export {useStore};