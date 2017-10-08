import { AuthGuardService } from './auth-guard.service';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { RouterModule, Routes } from '@angular/router';


const routesForApp: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuardService]  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
]

export const routes: ModuleWithProviders = RouterModule.forRoot(routesForApp, { useHash: true });
