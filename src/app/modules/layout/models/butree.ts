export interface BuTree {
	key: string;
	label?: string;
	data?: any;
	icon: string;
	children?: [key?: string, label?: string, data?: any, icon?: string, ChildNode?: any[]];
}
