import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ErrorComponent} from "./components/error/error.component";
import {RouteController} from "./services/RouteController";
import {FormComponent} from "./components/form/form.component";
import {PageComponent} from "./components/page/page.component";
import {AppComponent} from "./components/app/app.component";
import {ContentComponent} from "./components/content/content.component";

var appRoutes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: '',
        component: PageComponent
      },
      {
        path: ':side',
        component: PageComponent
      },
      {
        path: ':side/:subpage',
        component: PageComponent
      },
    ]
  },
  {
    path: 'error/not-found',
    component: ErrorComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
