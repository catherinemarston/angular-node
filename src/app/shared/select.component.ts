

import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormService } from 'src/app/shared/form.service';

@Component({
    selector: 'app-modal-select',
    template: `
        <div class="has-icon-right">
            <input auto-complete
                   [accept-user-input]="false"
                   [disabled]="service.disabled$ | async"
                   class="form-input"
                   [ngModel]="value"
                   [source]="options"
                   [list-formatter]="listFormatter.bind(this)"
                   [match-formatted]="true"
                   [value-formatter]="labelFormatter"
                    (valueChanged)="handleValueChanged($event)"
                    (ngModelChange)="inputChange($event)"
                    max-num-list="10"
                   display-property-name="label">
            <i class="form-icon icon icon-caret"></i>
        </div>
    `,
})
export class SelectComponent {
    @Input() options: Array<any>;
    @Input() labelFormatter: (data: any) => string;
    @Input() canClear = false;
    @Output() change = new EventEmitter();

    value: any;

    constructor(public service: FormService) {
        service.getValue().subscribe(value => {
            // FIXME: expression changed after it was checked
            setTimeout(() => {
                // ng2 dropdown only considers undefined as a value missing
                // marker. If we pass in null it will set the input value to
                // "null".
                this.value = value || undefined;
            }, 0);
        });
    }

    listFormatter(data: any) {
        // TOOD: I had to remove sanitization from this at it was giving considerable performance issues.
        //        Need to find a way of doing it.
        return `<a href="#" class="select-option">${this.labelFormatter(
            data,
        )}</a>`;
    }

    handleValueChanged(value: string) {
        // ng2 dropdown will return an empty string if the input is empty - we
        // expect an undefined.
        if (!value) {
            value = undefined;
        }
        // Differentiate between null and empty string which occurs only when
        // clearing the selected data
        if (this.canClear && '' === this.value) {
            this.value = null;
            this.service.onChange(null);
            this.change.emit(null);
            return;
        }
        // ng2 dropdown will trigger a value changed even if it only reverted it
        if (value === this.value) {
            return;
        }
        // See: https://angular.io/guide/template-syntax#safe-navigation-operator
        // If we were to use an empty string (which the dropdown would return
        // in case of a missing value), we would have to introduce checks for
        // empty strings as well.
        this.value = value;
        this.service.onChange(this.value || null);
        this.change.emit(this.value || null);
    }

    inputChange($event) {
        if (this.canClear && !$event) {
            this.value = '';
            this.service.onChange(null);
        }
    }
}
