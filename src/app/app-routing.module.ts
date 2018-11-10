import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LecturesPage } from './lectures/lectures.page';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
