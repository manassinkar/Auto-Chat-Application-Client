import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  viewOrders()
  {
    this.router.navigateByUrl('/orders');
  }

  chat()
  {
    this.router.navigateByUrl('/home');
  }

  logout()
  {
    this.authService.logout().then(() =>
    {
      this.router.navigateByUrl('/login');
    });
  }
}
