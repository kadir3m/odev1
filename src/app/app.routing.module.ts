import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductFormComponent} from './components/product-form/product-form.component';

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'parent' },
      { path: 'parent', component: ProductListComponent},
      { path: 'child', component: ProductFormComponent}
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [],

})
export class AppRoutingModule {}
