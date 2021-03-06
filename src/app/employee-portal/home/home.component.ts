import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private titleService: Title,
    private router: Router
  ) {
    this.titleService.setTitle('Employee Portal');
  }

  username: string;
  panelOpenState = false;
  routerLink = this.router.url.split('/')[2];

  public ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) this.username = currentUser.username;

    let s = document.createElement('script');
    s.setAttribute('src', 'https://cdn.cai.tools.sap/webchat/webchat.js');
    s.setAttribute('channelId', '0d8f91c0-9806-47ed-aada-51aab3ed0d77');
    s.setAttribute('token', '7486c468c7776e3375f4602ead94e26f');
    s.setAttribute('id', 'cai-webchat');
    document.body.appendChild(s);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
