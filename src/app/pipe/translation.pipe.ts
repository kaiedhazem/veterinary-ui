import {Injectable, Pipe, PipeTransform} from '@angular/core';

import {ConstantsService} from '@ms-service/constants.service';
import {SecurityStorageService} from '@security/service/security-storage.service';

/**
 * Created by slimC on 15/05/2020.
 */

@Injectable({
    providedIn: 'root'
})

@Pipe({ name: 'translation' })
export class TranslationPipe implements PipeTransform {
    constructor(private securityStorage: SecurityStorageService) {
    }

    transform(value, args?: string[]): any {
        const translation = this.securityStorage.getTranslation();
        const label = translation[value];
        if (label) {
            return label;
        } else {
          return value;
        }
    }
}
