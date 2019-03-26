import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: './pages/intro/intro.module#IntroPageModule'
  },
  {
    path: 'lectures',
    loadChildren: './pages/lectures/lectures.module#LecturesPageModule'
  },
  {
    path: 'events',
    loadChildren: './pages/events/events.module#EventsPageModule'
  },
  {
    path: 'settings',
    loadChildren: './pages/settings/settings.module#SettingsPageModule'
  },
  {
    path: 'cantine',
    loadChildren: './pages/cantine/cantine.module#CantinePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
