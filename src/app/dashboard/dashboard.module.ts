import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterfaceComponent } from './interface/interface.component';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { OrgComponent } from './org/org.component';
import { RegVotersComponent } from './reg-voters/reg-voters.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
      {path:'dashboard', canActivate: [AuthGuard], component: InterfaceComponent},
      {path:'about', canActivate: [AuthGuard],  component: AboutComponent},
      {path: 'org/:id',canActivate: [AuthGuard],  component:OrgComponent},
      {path: 'org/regvoters/:id',canActivate: [AuthGuard],  component: RegVotersComponent},
      {path: 'org/candidates/:id',canActivate: [AuthGuard],  component: CandidatesComponent},
      {path: 'settings/:id',canActivate: [AuthGuard],  component: SettingsComponent},
      {path: 'create',canActivate: [AuthGuard],  component: CreateComponent}
    ]


@NgModule({
  declarations: [InterfaceComponent, CreateComponent, OrgComponent, RegVotersComponent, CandidatesComponent, SettingsComponent, AboutComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DashboardModule { }
