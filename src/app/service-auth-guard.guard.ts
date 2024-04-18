import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerServiceService } from './services/seller-service.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthGuardGuard implements CanActivate {

  constructor(private sellerService: SellerServiceService) {
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.sellerService.isSellerLoggedIn
  }
}
