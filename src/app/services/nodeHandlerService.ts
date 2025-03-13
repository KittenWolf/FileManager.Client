import { Injectable } from "@angular/core";
import { NodeComponent } from "../catalog/node/node.component";
import { Subject } from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class NodeHandlerService {
	public activeNodeComponent$ = new Subject<NodeComponent>();

	public setActiveNodeComponent(node: NodeComponent) {
		this.activeNodeComponent$.next(node);
	}
}