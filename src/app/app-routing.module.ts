import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { truncateSync } from 'fs';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/lectures',
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
    loadChildren: './pages/cantine/cantine.module#CantinePageModule'
  },
  {
    path: 'event-details',
    loadChildren: './pages/event-details/event-details.module#EventDetailsPageModule'
  },
  {
    path: 'courseselection',
    loadChildren: './pages/settings/courseselection/courseselection.module#CourseselectionPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
