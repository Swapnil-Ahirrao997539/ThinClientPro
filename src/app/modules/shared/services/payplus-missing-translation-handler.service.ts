import { Injectable } from '@angular/core';
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

@Injectable({
	providedIn: 'root'
})
export class PayplusMissingTranslationHandlerService implements MissingTranslationHandler {
	handle(params: MissingTranslationHandlerParams) {
		return params.key;
	}

	constructor() {}
}
