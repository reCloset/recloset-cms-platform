import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlaggedItemsComponent } from './flagged-items/flagged-items.component';

const routes: Routes = [
  { path: 'flagged-items', component: FlaggedItemsComponent },
  { path: '',   redirectTo: '/flagged-items', pathMatch: 'full' },
  // Add more routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }