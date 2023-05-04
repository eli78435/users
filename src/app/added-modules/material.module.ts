import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

const material = [
  MatToolbarModule, 
  MatIconModule, 
  MatButtonModule,
  MatMenuModule,
  MatCardModule,
  MatInputModule
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
