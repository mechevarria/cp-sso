import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { ChartsComponent } from './charts/charts.component';
import { AppMapComponent } from './app-map/app-map.component';
import { StatusComponent } from './status/status.component';
import { AnalysisComponent } from './analysis/analysis.component';

export const AppRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: 'Home'
    },
    children: [
      {
        path: 'charts',
        component: ChartsComponent,
        data: {
          breadcrumb: 'Charts'
        }
      },
      {
        path: 'table',
        component: TableComponent,
        data: {
          breadcrumb: 'Table'
        }
      },
      {
        path: 'map',
        component: AppMapComponent,
        data: {
          breadcrumb: 'Map'
        }
      },
      {
        path: 'status',
        component: StatusComponent,
        data: {
          breadcrumb: 'Status'
        }
      },
      {
        path: 'analysis',
        component: AnalysisComponent,
        data: {
          breadcrumb: 'Analysis'
        }
      }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
