import { Injectable, OnDestroy } from "@angular/core";
import { GameCore } from "../../index";

@Injectable({
    providedIn: "root",
})
export class GameCoreService implements OnDestroy {
    public app: GameCore | null = null;

    async initialize(load: string) {
        this.app = new GameCore();

        this.app.load(load);
    }

    ngOnDestroy() {
        this.app = null;
    }
}
