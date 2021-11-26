import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeadderComponent } from './headder/headder.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [FooterComponent, HeadderComponent, LoadingComponent],
  imports: [
    CommonModule
  ],
  exports:[
    FooterComponent,
    HeadderComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
