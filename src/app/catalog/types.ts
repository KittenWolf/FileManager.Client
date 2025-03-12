export interface CatalogNodeData {
	name: string;
	nesting: number;
	size: string;
	date: string;
	type?: string;
	children?: CatalogNodeData[];
}
