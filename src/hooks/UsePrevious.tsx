import { useEffect, useRef } from "react";

function usePrevious(value: any) {
    const ref: any = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export default usePrevious;