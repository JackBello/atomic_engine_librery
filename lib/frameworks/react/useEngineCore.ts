import { useEffect, useState } from "react";
import { EngineCore } from "../../index";
import type { IOptionsEngineCore } from "../../app/types";

export const useEngineCore = (options?: Partial<IOptionsEngineCore>) => {
    const [app, setApp] = useState<EngineCore | null>(null);

    useEffect(() => {
        const engine = new EngineCore(options);

        setApp(engine);

        return () => {
            setApp(null);
        };
    }, [options]);

    return app;
};
