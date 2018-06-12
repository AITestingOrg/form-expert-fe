import { DashboardComponent } from './dashboard/dashboard.component';

export const appRoutes = [
  { path: '', redirectTo: '/label-mapping', pathMatch: 'full' },
  { path: 'label-mapping', component: DashboardComponent },
];
