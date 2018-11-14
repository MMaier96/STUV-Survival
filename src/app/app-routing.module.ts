import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lectures',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: './intro/intro.module#IntroPageModule'
  },
  {
    path: 'lectures',
    loadChildren: './lectures/lectures.module#LecturesPageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsPageModule'
  },
  { path: 'cantine', loadChildren: './cantine/cantine.module#CantinePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
