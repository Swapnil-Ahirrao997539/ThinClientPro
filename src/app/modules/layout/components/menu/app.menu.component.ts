import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/modules/shared/services/app.settings';
import { MenuService } from '../../services/app.menu.service';
import { NodeService } from 'src/app/modules/service/node.service';
import { LayoutService } from '../../services/app.layout.service';

@Component({
	selector: 'app-menu',
	templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
	isCollapse: boolean;
	model: any[] = [];
	activeIndex: number | undefined = 0;
	files1: TreeNode[] = [];
	selectedFiles1: TreeNode[] = [];
	items: any[] | undefined;

	selectedItem: any;
	changeFont: boolean = false;
	suggestions: any[] | undefined;
	files!: TreeNode[];

	modules: any[] = [
		{ name: 'Processign', code: 'processign' },
		{ name: 'User Admin', code: 'Useradmin' }
	];
	viewType = [
		{ name: 'Aggregate', code: 'aggregate' },
		{ name: 'Individual', code: 'individual' }
	];
	sessionType: any[] = [
		{ name: 'CLS1', value: 'cls1' },
		{ name: 'SDS', value: 'sds' },
		{ name: 'CLSNET', value: 'clsnet' },
		{ name: 'LCH', value: 'lch' },
		{ name: 'CLSNOW', value: 'clsnow' }
	];
	value10: any;
	value11: any;
	value12: any;
	matchString: any;
	stateOptions: any[] = [
		{ label: 'Processing', value: 'Processing' },
		{ label: 'User Admin', value: 'User Admin' }
	];

	value: string = 'Processing';

	activeIndx: number = 0;
	index: number = 0;
	queueName: any;
	constructor(
		public layoutService: LayoutService,
		private nodeService: NodeService,
		private MenuService: MenuService,
		private APPCONSTANT: AppSettings,
		public router: Router
	) {}

	ngOnInit() {
		if (this.router.url == '/dashboard') {
			this.layoutService.isSelection = false;
		} else {
			this.layoutService.isSelection = true;
		}

		// this.value10 = 'processign';
		this.value11 = this.viewType[1];
		this.value12 = this.sessionType[0];
		this.nodeService.getFiles().then((files) => (this.files1 = files));
		this.nodeService.getFiles().then((data) => (this.files = data));

		this.MenuService.selectedViewType.next(this.value11);
		this.MenuService.sessionType.next(this.value12);
		this.MenuService.moduleValue.next(this.value);

		this.model = [
			{
				label: 'Menu',
				isCollapse: true,
				items: [
					{
						label: 'Systems',
						icon: 'pi pi-fw pi-bookmark',
						items: [
							{
								label: 'Change Password',
								icon: 'pi pi-fw pi-bookmark'
							},
							{
								label: 'Exit',
								icon: 'pi pi-fw pi-bookmark'
								// items: [
								//     { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
								// ]
							}
						]
					},
					{
						label: 'SMC',
						icon: 'pi pi-fw pi-bookmark',
						items: [
							{
								label: 'Session Control',
								icon: 'pi pi-fw pi-bookmark'
							},
							{
								label: 'Tuxedo Queue Monitor',
								icon: 'pi pi-fw pi-bookmark'
							}
						]
					},
					{
						label: 'Configuration & Setup',
						icon: 'pi pi-fw pi-bookmark',
						items: [
							{
								label: 'Create',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Location', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/location'] },
									{ label: 'Legal Entity', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/legal-entity'] },
									{ label: 'Bank Relationship', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Location', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Fund Group', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Financial Pool', icon: 'pi pi-fw pi-bookmark' }
								]
							}
						]
					},
					{
						label: 'Table Maintenance',
						icon: 'pi pi-fw pi-bookmark',
						items: [
							{ label: 'Bank Identifier', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Currency Holiday', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Payment Method cuttoff', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'External Interface', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Currency Maintenance', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Interdiction', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Exchange Rate ', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Processing ICA Rules', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Fund Manager', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Process Uploaded Funds', icon: 'pi pi-fw pi-bookmark' },
							{
								label: 'Counterparty ALGD List',
								icon: 'pi pi-fw pi-bookmark'
							},
							{ label: 'Static Data Request', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Static Data Bulk Create', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'MI Auto Replay', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Static Data Bulk Amend', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Netting Groups', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Static Data Delete', icon: 'pi pi-fw pi-bookmark' }
						]
					},
					{
						label: 'Dashboard View',
						icon: 'pi pi-fw pi-bookmark',
						routerLink: ['/dashboard']
					}
				]
			},
			{
				label: 'Tree',
				items: [
					// {
					//     label: 'System', icon: 'pi pi-fw pi-bookmark'
					// },
					// {
					//     label: 'Treasury Security', icon: 'pi pi-fw pi-bookmark'
					// },
					// {
					//     label: 'Control Branch', icon: 'pi pi-fw pi-bookmark',
					//     items: [
					//         { label: 'London Branch', icon: 'pi pi-fw pi-bookmark',
					//           items:[
					//           {label:'Atlanta-2',icon: 'pi pi-fw pi-bookmark'},
					//           {label:'Bahamas Beach Bank',icon: 'pi pi-fw pi-bookmark'},
					//           {label:'New Branch SC',icon: 'pi pi-fw pi-bookmark'},
					//           {label:'SEB TP',icon: 'pi pi-fw pi-bookmark'}
					//         ]},
					//     ]
					// },
					// {
					//     label: 'Queue Explorer', icon: 'pi pi-fw pi-bookmark',
					//     items : [{
					//         label : 'Configuration & Setup', icon: 'pi pi-fw pi-bookmark',
					//         items: [
					//             { label: 'Pending', icon: 'pi pi-fw pi-bookmark',},
					//             { label: 'Active', icon: 'pi pi-fw pi-bookmark', },
					//             { label: 'Rejected', icon: 'pi pi-fw pi-bookmark', },
					//         ]
					//       }
					//     ]
					// },
					// { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
					// { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
					// { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
					// { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
					// { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
					// { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
					// { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
					// { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
					// { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
					// { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
					// { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
					// { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
					// { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
					// { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
					// { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
				]
			},
			{
				label: 'Queue Explorer',
				items: [
					{
						label: 'Configuration & Setup',
						icon: 'pi pi-fw pi-bookmark',
						items: [
							{
								label: 'Pending',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/grid-list/location-list'] },
									{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/grid-list/legal-entity-list'] },
									{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
								]
							},
							{
								label: 'Active',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
								]
							},
							{
								label: 'Rejected',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
								]
							}
						]
					}
				]
			}
		];
		this.layoutService.accordianOpen.subscribe((data) => {
			this.activeIndx = data;
		});

		this.layoutService.queueExplorerString.subscribe((data) => {
			this.queueName = data;
			if (this.queueName == 'System') {
				this.model[2].items = [];
				for (let i = 0; i < this.model.length; i++) {
					if (this.model[i].label == 'Queue Explorer') {
						this.model[i].items.push({
							label: 'Configuration & Setup',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Pending',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/grid-list/location-list'] },
										{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/grid-list/legal-entity-list'] },
										{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
									]
								},
								{
									label: 'Active',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
									]
								},
								{
									label: 'Rejected',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
									]
								}
							]
						});
					}
				}
			}
			if (this.queueName == 'Control Branch') {
				this.model[2].items = [];
				this.model[0].items = [];

				for (let i = 0; i < this.model.length; i++) {
					if (this.model[i].label == 'Queue Explorer') {
						this.model[i].items.push(
							{
								label: 'Trades',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'In-CLS', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Final', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'UDQ', icon: 'pi pi-fw pi-bookmark' }
								]
							},
							{ label: 'Pay-In', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Pay-Out', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'SMC', icon: 'pi pi-fw pi-bookmark' }
						);
					}

					if (this.model[i].label == 'Menu') {
						this.model[i].items.push(
							{
								label: 'Trades',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'In-CLS', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Final', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'UDQ', icon: 'pi pi-fw pi-bookmark' }
								]
							},
							{ label: 'Pay-In', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Pay-Out', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Pay-In', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'SMC', icon: 'pi pi-fw pi-bookmark' }
						);
					}
				}
			}
		});
	}
	onTabOpen(e) {
		this.activeIndx = e.index;
	}

	changeViewType() {
		this.MenuService.selectedViewType.next(this.value11);
		this.MenuService.moduleValue.next(this.value);
	}
	changeSessionType() {
		this.MenuService.sessionType.next(this.value12);
		this.MenuService.moduleValue.next(this.value);
	}
	search(event: AutoCompleteCompleteEvent) {
		this.suggestions = this.APPCONSTANT.buTrees;

		let filtered: any[] = [];
		let query = event.query;

		for (let i = 0; i < (this.suggestions as any[]).length; i++) {
			let country = (this.suggestions as any[])[i];
			if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(country);
			}
		}
		this.suggestions = filtered;
	}

	CBFlag = 0;

	onButreeClick(event) {
		let g = event.target.innerText;
		this.queueName = g;
		if (g) {
			this.activeIndx = 2;
		} else {
			return;
		}

		if (g == 'System') {
			this.model[2].items = [];
			this.model[0].items = [];
			// this.router.navigate(['/uikit/blank']);
			// this.layoutService.gridHeader.next('System');

			this.layoutService.gridHeader.next('System');

			this.layoutService.isSelection = true;
			for (let i = 0; i < this.model.length; i++) {
				if (this.model[i].label == 'Queue Explorer') {
					this.model[i].items.push({
						label: 'Configuration & Setup',
						icon: 'pi pi-fw pi-bookmark',
						items: [
							{
								label: 'Pending',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/grid-list/location-list'] },
									{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/grid-list/legal-entity-list'] },
									{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
								]
							},
							{
								label: 'Active',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
								]
							},
							{
								label: 'Rejected',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
								]
							}
						]
					});
				}

				//   Menu Appending

				if (this.model[i].label == 'Menu') {
					this.model[i].items.push(
						{
							label: 'Systems',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Change Password',
									icon: 'pi pi-fw pi-bookmark'
								},
								{
									label: 'Exit',
									icon: 'pi pi-fw pi-bookmark'
									// items: [
									//     { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
									// ]
								}
							]
						},
						{
							label: 'SMC',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Session Control',
									icon: 'pi pi-fw pi-bookmark'
								},
								{
									label: 'Tuxedo Queue Monitor',
									icon: 'pi pi-fw pi-bookmark'
								}
							]
						},
						{
							label: 'Configuration & Setup',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Create',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Location', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/location'] },
										{ label: 'Legal Entity', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/legal-entity'] },
										{ label: 'Bank Relationship', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Location', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Fund Group', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Financial Pool', icon: 'pi pi-fw pi-bookmark' }
									]
								}
							]
						},
						{
							label: 'Table Maintenance',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{ label: 'Bank Identifier', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Currency Holiday', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Payment Method cuttoff', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'External Interface', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Currency Maintenance', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Interdiction', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Exchange Rate ', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Processing ICA Rules', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Fund Manager', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Process Uploaded Funds', icon: 'pi pi-fw pi-bookmark' },
								{
									label: 'Counterparty ALGD List',
									icon: 'pi pi-fw pi-bookmark'
								},
								{ label: 'Static Data Request', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Static Data Bulk Create', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'MI Auto Replay', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Static Data Bulk Amend', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Netting Groups', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Static Data Delete', icon: 'pi pi-fw pi-bookmark' }
							]
						},
						{
							label: 'Dashboard View',
							icon: 'pi pi-fw pi-bookmark',
							routerLink: ['/dashboard']
						}
					);
					// this.layoutService.gridHeader.next('System');
				}
			}
		}
		if (g == 'Control Branch') {
			this.model[2].items = [];
			this.model[0].items = [];
			// this.router.navigate(['/uikit/blank']);

			this.layoutService.gridHeader.next('Control Branch');
			this.layoutService.isSelection = true;

			for (let i = 0; i < this.model.length; i++) {
				if (this.model[i].label == 'Queue Explorer') {
					this.model[i].items.push(
						{
							label: 'Trades',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{ label: 'In-CLS', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Final', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'UDQ', icon: 'pi pi-fw pi-bookmark' }
							]
						},
						{ label: 'Pay-In', icon: 'pi pi-fw pi-bookmark' },
						{ label: 'Pay-Out', icon: 'pi pi-fw pi-bookmark' },
						{ label: 'SMC', icon: 'pi pi-fw pi-bookmark' }
					);
				}
				if (this.model[i].label == 'Menu') {
					this.model[i].items.push(
						{
							label: 'Systems',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Change Password',
									icon: 'pi pi-fw pi-bookmark'
								},
								{
									label: 'Exit',
									icon: 'pi pi-fw pi-bookmark'
									// items: [
									//     { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
									// ]
								}
							]
						},
						{
							label: 'Trades',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Alleged/Unmatched',
									icon: 'pi pi-fw pi-bookmark'
								},
								{
									label: 'UDQ',
									icon: 'pi pi-fw pi-bookmark'
								}
							]
						},
						{
							label: 'Pay-In',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Create',
									icon: 'pi pi-fw pi-bookmark'
								},
								{
									label: 'UDQ',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Create UDQ', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/location'] },
										{ label: 'Delete UDQ', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/legal-entity'] }
									]
								}
							]
						},
						{
							label: 'Pay-Out',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Create',
									icon: 'pi pi-fw pi-bookmark'
								},
								{
									label: 'UDQ',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Create UDQ', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/location'] },
										{ label: 'Delete UDQ', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/legal-entity'] }
									]
								}
							]
						},
						{
							label: 'SMC',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{ label: 'Main Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Payments Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Liquidity Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Exception Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Settlement', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Accounting Entries', icon: 'pi pi-fw pi-bookmark' }
							]
						},
						{
							label: 'Configuration & Setup',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Create',
									icon: 'pi pi-fw pi-bookmark'
								},
								{ label: 'Main Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Payments Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Liquidity Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Exception Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Settlement', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Accounting Entries', icon: 'pi pi-fw pi-bookmark' }
							]
						},
						{
							label: 'Dashboard View',
							icon: 'pi pi-fw pi-bookmark',
							routerLink: ['/dashboard']
						}
					);
					this.layoutService.gridHeader.next('Dashboard View');
				}
			}
		}
		let found = false;
		this.files.forEach((node) => {
			if (node.label == g) {
				this.changeFont = true;
				this.matchString = node.label;
			}
		});

		this.files[2].children[0].children.forEach((node) => {
			// for(let j=0;j<this.files[2].children[0].children.length;j++) {
			if (node.label.trim() == g) {
				this.matchString = node.label;
			}
		});
	}

	activeIndexChange(index: number) {
		this.activeIndex = index;
		this.isCollapse = false;
	}
}