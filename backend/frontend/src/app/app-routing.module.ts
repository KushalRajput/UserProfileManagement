import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { GaurdsGuard } from './gaurds/gaurds.guard';


const routes: Routes = [
  { path: '', loadChildren: () => import('./commonpages/commonpages.module').then(m => m.CommonpagesModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate: [GaurdsGuard] },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate: [GaurdsGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
