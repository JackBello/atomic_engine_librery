import { useEffect, useState } from "react";
import { GameCore } from "../../index";

export const useEngineCore = (load: string) => {
    const [app, setApp] = useState<GameCore | null>(null);

    useEffect(() => {
        const game = new GameCore();

        game.load(load);

        setApp(game);

        return () => {
            setApp(null);
        };
    }, [load]);

    return app;
};
