import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  emailControl: FormControl = new FormControl();

  saveEmail(): void {
    
  }
}
