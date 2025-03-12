import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CatalogNodeData } from "../catalog/types";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class HttpDataService {
	private _url: string = 'https://localhost:7129/FileManager/upload';

	constructor(private readonly _httpClient: HttpClient) {
	}

	public getData(formData: FormData): Observable<CatalogNodeData> {		
		return this._httpClient.post<CatalogNodeData>(this._url, formData);			
	}
}