import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if the necessary authentication information is present in localStorage
    const isAuthenticated = localStorage.getItem('accesskey') !== null;

    if (isAuthenticated) {
      return true; // Allow access to the route
    } else {
      // If not authenticated, redirect to the login page
      this.router.navigate(['/Login']); // Adjust the route as needed
      return false; // Prevent access to the route
    }
  }
}