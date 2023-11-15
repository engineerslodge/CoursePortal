import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
  export class RoleGuard implements CanActivate {
    constructor(private router: Router) {}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const requiredRole = next.data['requiredRole']; // Access route data
  
      const userRoles = localStorage.getItem('role'); // Get user roles from localStorage

      // Check if userRoles exist and include the required role
      if (userRoles && userRoles.includes(requiredRole)) {
        return true; // Allow access
      } else {
        // Redirect to an unauthorized page or show an error message
        this.router.navigate(['/unauthorized']);
        return false; // Prevent access
      }
    }
  
    private checkUserRole(requiredRole: string): boolean {
     
      const userRoles = ['Admin', 'Customer'];  
      return userRoles.includes(requiredRole);
    }
  }