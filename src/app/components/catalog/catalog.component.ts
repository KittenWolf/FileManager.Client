import { Component, Input } from "@angular/core";
import { FileInfoComponent } from "./fileInfo/fileInfo.component";
import { CatalogNodeData } from "./types";
import { NodeComponent } from "./node/node.component";

@Component({
	selector: 'app-catalog',
	standalone: true,
	templateUrl: './catalog.component.html',
	styleUrl: './catalog.component.scss',
	imports: [FileInfoComponent, NodeComponent]
})

export class CatalogComponent {
	@Input()
	public mainNode!: CatalogNodeData;
} 