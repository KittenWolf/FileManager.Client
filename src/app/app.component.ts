import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatalogComponent } from "./components/catalog/catalog.component";
import { FileFormComponent } from './components/fileForm/fileForm.component';
import { CatalogNodeData } from './components/catalog/types';
import { HeaderComponent } from './components/header/header.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderComponent, CatalogComponent, FileFormComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
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

	public onResetEvent(): void {
		this.data = null;
		localStorage.clear();
		window.location.reload();
	}
}
