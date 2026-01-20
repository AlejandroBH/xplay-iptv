import { useEffect } from "react";

export const useKeyboardShortcuts = (handlers, enabled = true) => {
    useEffect(() => {
        if (!enabled) return;

        const handleKeyPress = (event) => {
            if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
                return;
            }

            const key = event.key.toLowerCase();

            if (["arrowup", "arrowdown", " "].includes(key)) {
                event.preventDefault();
            }

            switch (key) {
                case "arrowup":
                    handlers.onPreviousChannel?.();
                    break;
                case "arrowdown":
                    handlers.onNextChannel?.();
                    break;
                case " ":
                    handlers.onTogglePlay?.();
                    break;
                case "m":
                    handlers.onToggleMute?.();
                    break;
                case "escape":
                    handlers.onCloseList?.();
                    break;
                case "l":
                    handlers.onOpenList?.();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handlers, enabled]);
};
