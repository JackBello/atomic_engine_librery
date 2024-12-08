import type { GlobalNode } from "@/nodes/global/global-node";
import type { TClass } from "./types";
import ConstructorNodes from "@/nodes/global/constructors/constructor-nodes";

export function RegisterNode(target: TClass<GlobalNode>) {
    ConstructorNodes.addNode(target.name, target)
}