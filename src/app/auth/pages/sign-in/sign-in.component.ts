import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthFormComponent} from "../../components/auth-form/auth-form.component";


@Component({
    selector: 'gac-sign-in',
    standalone: true,
    imports: [
        CommonModule,
        AuthFormComponent,
    ],
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {


}
