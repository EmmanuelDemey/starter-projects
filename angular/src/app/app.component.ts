import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular';
  username: string;

  constructor(private userService: UserService) {
    userService.getCurrentUser().subscribe((user) => {
      this.username = user.username;
    });
  }
}
