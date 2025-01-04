import type { EngineCore } from "@/app/engine";
import type { GameCore } from "@/app/game";
import { SetApp } from "@/app/symbols";
import { GetApp } from "@/symbols";

export abstract class BaseAppAbstract {
    protected static APP: EngineCore | GameCore

    get [GetApp]() {
        return BaseAppAbstract.APP;
    }

    static [SetApp](app: EngineCore | GameCore): void {
        BaseAppAbstract.APP = app;
    }
}