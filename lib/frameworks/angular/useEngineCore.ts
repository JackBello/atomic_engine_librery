import { Injectable, OnDestroy } from "@angular/core";
import { EngineCore } from "../../index";
import type { IOptionsEngineCore } from "../../app/types";

@Injectable({
    providedIn: "root",
})
export class EngineCoreService implements OnDestroy {
    public app: EngineCore | null = null;

    initialize(options?: Partial<IOptionsEngineCore>) {
        this.app = new EngineCore(options);
    }

    ngOnDestroy() {
        this.app = null;
    }
}
