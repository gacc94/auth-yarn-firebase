import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractControl} from "@angular/forms";
import {validatorErrorMessage} from '@utils/validator-message';
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
    selector: 'gac-error-message',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule],
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
    @Input() control!: AbstractControl;

    get errorMessage(): string {
        const error = this.control?.errors;
        const [validatorName] = Object.keys(error ?? {});
        return this.control.touched && validatorName
            ? validatorErrorMessage(validatorName) :
            '';
    }

}
