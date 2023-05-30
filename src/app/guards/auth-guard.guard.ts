import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private location: Location
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        if (this.authService.isAuthenticatedfn()) {
            return true;
        } else {
            this.location.replaceState('/');
            return this.router.createUrlTree(['/auth/login']);
        }
    }
}
