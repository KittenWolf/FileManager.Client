import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { FileFormComponent } from './fileForm/fileForm.component';
import { CatalogNodeData } from './catalog/types';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderComponent, CatalogComponent, FileFormComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
	public title = 'FileManager';
	
	public data: CatalogNodeData | null = null;

	public ngOnInit(): void {
		const savedData = localStorage.getItem("catalog");
		
		if (savedData) {
			this.data = JSON.parse(savedData);
		}
	}

	public onLoadData(data: CatalogNodeData): void {
		localStorage.setItem("catalog", JSON.stringify(data));
		this.data = data;
	}

	public onSortEvent(): void {

	}

	public onSearchEvent(): void {

	}

	public onResetEvent(): void {
		localStorage.clear();
		this.data = null;
	}
}
