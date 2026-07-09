import { Route } from '@angular/router';
import { EventFormComponent } from './event-form/event-form.component';
import { CfpFormComponent } from './cfp-form/cfp-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'events/new', component: EventFormComponent },
  { path: 'talks/new', component: CfpFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'dashboard' }
];
