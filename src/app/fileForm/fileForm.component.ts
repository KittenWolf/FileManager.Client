import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { CatalogNodeData } from "../catalog/types";
import { HttpDataService } from "../services/httpDataService";
import { Subscription } from "rxjs";

@Component({
	selector: 'app-fileForm',
	templateUrl: './fileForm.component.html',
	styleUrl: './fileForm.component.scss'
})

export class FileFormComponent implements OnInit, OnDestroy {
	private _subscription: Subscription | undefined;

	@Output()
	public onLoadData = new EventEmitter<CatalogNodeData>();

	constructor(private readonly _httpDataService: HttpDataService) {
	}

	public ngOnInit(): void {
	}

	public ngOnDestroy(): void {
		this._subscription?.unsubscribe();
	}

	public loadData(event: any): void {
		var formData = new FormData();
		var selectedFile = event.target.files[0];

		if (!selectedFile) {
			return;
		}

		formData.append('file', selectedFile);

		var onServerResponse = this.onServerResponse.bind(this);
		var onServerException = this.onServerException.bind(this);

		this._subscription = this._httpDataService.getData(formData).subscribe({
			next(response) {
				onServerResponse(response);
			},
			error(error) {
				onServerException(error);
			},
		});
	}

	private onServerResponse(data: CatalogNodeData): void {
		this.onLoadData.emit(data);
	}

	private onServerException(error: string): void {
		console.log(error);
	}
}