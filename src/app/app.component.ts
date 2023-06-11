import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {environment} from "@environments/environment";

@Component({
  selector: 'gac-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'auth-yarn-fire';

  constructor() {
      console.log('env: => ', environment.name);
  }
}
