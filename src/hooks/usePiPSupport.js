import { useState, useEffect } from "react";

export const usePiPSupport = () => {
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        setIsSupported(document.pictureInPictureEnabled === true);
    }, []);

    return isSupported;
};
