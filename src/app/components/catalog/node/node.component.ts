import { Component, Input, OnInit } from "@angular/core";
import { CatalogNodeData, NodeSortType } from "../types";
import { NodeHandlerService } from "../../services/nodeHandlerService";

@Component({
	selector: 'app-catalog-node',
	standalone: true,
	templateUrl: './node.component.html',
	styleUrl: './node.component.scss'
})

export class NodeComponent implements OnInit {
	private readonly _maxNameLength: number = 20;

	@Input()
	public parentNodeComponent?: NodeComponent;

	@Input()
	public nodeData!: CatalogNodeData;

	@Input()
	public isActive: boolean = false;

	@Input()
	public isDropped: boolean = false;

	constructor(private readonly _nodeHandlerService: NodeHandlerService) {
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

		this._nodeHandlerService.setActiveNodeComponent(this);
	}

	public setParentNodeActive(): void {
		if (!this.parentNodeComponent) {
			return;
		}

		this.rollUp();
		this.removeActive();
		this.parentNodeComponent.setActive();

		this._nodeHandlerService.setActiveNodeComponent(this.parentNodeComponent);
	}

	public sortChildren(sortType: NodeSortType) {
		switch (sortType) {
			case NodeSortType.byName:
				this.nodeData.children?.sort(this.sortByName);
				break;
			case NodeSortType.byDate:
				this.nodeData.children?.sort(this.sortByDate);
				break;
			case NodeSortType.bySize:
				this.nodeData.children?.sort(this.sortBySize);
				break;
		}
	}

	public truncate(str: string, limit: number = this._maxNameLength): string {
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

	private sortByName(a: CatalogNodeData, b: CatalogNodeData): number {
		if (a.name < b.name) {
			return -1;
		}

		if (a.name > b.name) {
			return 1;
		}

		return 0;
	}

	private sortByDate(a: CatalogNodeData, b: CatalogNodeData): number {
		return new Date(a.date).getTime() - new Date(b.date).getTime();
	}

	private sortBySize(a: CatalogNodeData, b: CatalogNodeData): number {
		if (a.bytes < b.bytes) {
			return -1;
		}

		if (a.bytes > b.bytes) {
			return 1;
		}

		return 0;
	}
}