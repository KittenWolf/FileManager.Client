import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FileInfoComponent } from "./fileInfo/fileInfo.component";
import { CatalogNodeData } from "./types";
import { NodeComponent } from "./node/node.component";
import { NodeHandlerService } from "../services/nodeUpdateService";

@Component({
	selector: 'app-catalog',
	standalone: true,
	templateUrl: './catalog.component.html',
	styleUrl: './catalog.component.scss',
	imports: [FileInfoComponent, NodeComponent]
})

export class CatalogComponent implements OnInit, OnDestroy {	
	public activeNodeComponent!: NodeComponent;

	@Input()
	public mainNode!: CatalogNodeData;

	constructor(private readonly _nodeHandlerService: NodeHandlerService) {
	}

	public ngOnInit(): void {
		document.addEventListener('keydown', (e) => {
			if (e.code == 'KeyQ') {
				this.activeNodeComponent.setParentNodeActive();
			}
		});

		this._nodeHandlerService.activeNodeComponent$.subscribe((node) => this.activeNodeComponent = node);
	}

	public ngOnDestroy(): void {
		this._nodeHandlerService.activeNodeComponent$.unsubscribe();
	}
} 