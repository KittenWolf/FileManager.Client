import { Component, Input, OnInit } from "@angular/core";
import { CatalogNodeData } from "../types";
import { NodeHandlerService } from "../../services/nodeUpdateService";

@Component({
	selector: 'app-catalog-node',
	standalone: true,
	templateUrl: './node.component.html',
	styleUrl: './node.component.scss'
})

export class NodeComponent implements OnInit {
	private readonly maxNameLength: number = 20;

	@Input()
	public parentNodeComponent?: NodeComponent;

	@Input()
	public nodeData!: CatalogNodeData;

	@Input()
	public isActive: boolean = false;

	@Input()
	public isDropped: boolean = false;

	constructor(private readonly _nodeUpdateService: NodeHandlerService) {
	}

	public ngOnInit(): void {
		if (!this.parentNodeComponent) {
			this.setThisNodeActive()
		}
	}

	public setThisNodeActive(): void {
		this.setActive();
		this.parentNodeComponent?.removeActive();

		this.isDropped = !this.isDropped;

		this._nodeUpdateService.setActiveNodeComponent(this);
	}

	public setParentNodeActive(): void {
		if (!this.parentNodeComponent) {
			return;
		}

		this.rollUp();
		this.removeActive();
		this.parentNodeComponent.setActive();

		this._nodeUpdateService.setActiveNodeComponent(this.parentNodeComponent);
	}

	public truncate(str: string, limit: number = this.maxNameLength): string {
		return str.length > limit ? str.substring(0, limit) + '...' : str;
	}

	private setActive(): void {
		this.isActive = true;
	}

	private removeActive(): void {
		this.isActive = false;
	}

	private rollUp(): void {
		this.isDropped = false;
	}
}