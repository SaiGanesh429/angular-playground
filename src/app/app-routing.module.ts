import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NorthAmericaChartComponent } from './north-america-chart/north-america-chart.component';

const routes: Routes = [
  { path: '', redirectTo: 'north-america-view', pathMatch: 'full' },
  { path: 'north-america-view', component: NorthAmericaChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
