import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthFormComponent} from "../../components/auth-form/auth-form.component";

@Component({
  selector: 'gac-sign-up',
  standalone: true,
    imports: [CommonModule, AuthFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

}
