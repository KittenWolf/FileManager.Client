import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { NodeHandlerService } from "../services/nodeHandlerService";
import { NodeComponent } from "../catalog/node/node.component";
import { CatalogNodeData, NodeSortType } from "../catalog/types";
import { Subscription } from "rxjs";

@Component({
	selector: 'app-header',
	standalone: true,
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})

export class HeaderComponent implements OnInit, OnDestroy {
	private _subsription: Subscription | undefined;
	
	public activeSortType: NodeSortType = NodeSortType.byName;
	public activeNodeComponent!: NodeComponent;

	@Input()
	public data: CatalogNodeData | null = null;

	@Output()
	public onResetEvent = new EventEmitter();

	constructor(private readonly _nodeHandlerService: NodeHandlerService) {
	}

	public ngOnInit(): void {
		document.addEventListener('keydown', (e) => {
			if (e.code == 'KeyS') {
				this.sort();
			}

			if (e.code == 'KeyQ') {
				this.setParentNodeActive();
			}

			if (e.code == 'KeyR') {
				this.reset();
			}

			if (e.code == 'KeyC') {
				this.changeSortType();
			}
		});

		this._subsription = this._nodeHandlerService.activeNodeComponent$.subscribe((node) => this.activeNodeComponent = node);
	}

	public ngOnDestroy(): void {
		this._subsription?.unsubscribe();
	}

	public setParentNodeActive(): void {
		this.activeNodeComponent.setParentNodeActive();
	}

	public sort(): void {
		this.activeNodeComponent.sortChildren(this.activeSortType);
	}

	public search(regEx: string): void {
		// TODO: Made search by regular expressions.
	}

	public reset(): void {
		this.onResetEvent.emit();
	}

	public changeSortType() {
		const values: number[] = Object.values(NodeSortType).filter(v => typeof v == "number");
		const length: number = values.length;
		const nextValue: number = this.activeSortType + 1;
		
		if (nextValue > length - 1) {
			this.activeSortType = values[0];
		}
		else {
			this.activeSortType = values[nextValue];
		}		
	}
}
