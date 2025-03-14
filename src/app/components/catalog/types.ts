export interface CatalogNodeData {
	name: string;
	bytes: bigint;
	size: string;
	date: string;
	type?: string;
	children?: CatalogNodeData[];
}

export enum NodeSortType {
	byName,
	byDate,
	bySize
}
