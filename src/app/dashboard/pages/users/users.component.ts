import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {MatButtonModule} from "@angular/material/button";
import {SweetAlertService} from "@services/sweet-alert.service";

@Component({
  selector: 'gac-users',
  standalone: true,
    imports: [CommonModule, SweetAlert2Module, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
    private readonly sweetAlertService = inject(SweetAlertService);

    ngOnInit() {
    }


    alert() {
        // this.sweetAlertService.alert();
    }



}
