import type { GlobalNode } from "@/nodes/global/global-node";
import type { TClass } from "./types";
import { ConstructorClasses } from "@/nodes/constructor-classes";

export function RegisterNode(target: TClass<GlobalNode>) {
    ConstructorClasses.add("nodes", target.name, target)
}