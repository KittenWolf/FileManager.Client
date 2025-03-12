import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NodeHandlerService } from "../services/nodeUpdateService";
import { NodeComponent } from "../catalog/node/node.component";
import { CatalogNodeData } from "../catalog/types";

@Component({
	selector: 'app-header',
	standalone: true,
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})

export class HeaderComponent {
	public activeNodeComponent!: NodeComponent;
	
	@Input()
	public data: CatalogNodeData | null = null;

	@Output()
	public onSortEvent = new EventEmitter();

	@Output()
	public onSearchEvent = new EventEmitter();

	@Output()
	public onResetEvent = new EventEmitter();

	constructor(private readonly _nodeHandlerService: NodeHandlerService) {
		this._nodeHandlerService.activeNodeComponent$.subscribe((node) => this.activeNodeComponent = node);
	}

	public sort(): void {
		this.onSortEvent.emit();
	}

	public search(regEx: string): void {
		this.onSearchEvent.emit(regEx);
	}

	public reset(): void {
		this.onResetEvent.emit();
	}
}
