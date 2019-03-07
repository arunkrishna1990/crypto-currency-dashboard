import { NgModule } from '@angular/core';
import {
  MatListModule, MatToolbarModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatExpansionModule
} from '@angular/material';

const materialModules = [
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialDesignModule {
}
