import { Component, OnDestroy, OnInit } from "@angular/core";
import { CatalogNodeData } from "../types";
import { NodeHandlerService } from "../../services/nodeUpdateService";

@Component({
	selector: 'app-fileInfo',
	standalone: true,
	templateUrl: './fileInfo.component.html',
	styleUrl: './fileInfo.component.scss'
})

export class FileInfoComponent implements OnInit, OnDestroy  {
	public nodeData!: CatalogNodeData;

	constructor(private readonly _nodeUpdateService: NodeHandlerService) {
	}

	public ngOnInit(): void {		
		this._nodeUpdateService.activeNodeComponent$.subscribe((node) => this.nodeData = node.nodeData);
	}

	public ngOnDestroy(): void {
		this._nodeUpdateService.activeNodeComponent$.unsubscribe();
	}
}