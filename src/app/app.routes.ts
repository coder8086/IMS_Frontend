import { Routes } from '@angular/router';
import { MyCartComponent } from './Pages/Electronics-Store/my-cart/my-cart.component';
import { AutomateBillingComponent } from './Pages/Electronics-Store/UserDashboard/Sections/billing/automate-billing/automate-billing.component';
import { ShowBillsComponent } from './Pages/Electronics-Store/UserDashboard/Sections/billing/show-bills/show-bills.component';
import { ElectronicsStoreHomeComponent } from './Pages/Electronics-Store/electronics-store-home/electronics-store-home.component';
import { UserdashboardComponent } from './Pages/Electronics-Store/UserDashboard/userdashboard/userdashboard.component';
import { LandingFooterComponent } from './Components/footer/landing-footer/landing-footer.component';
import { OtpComponent } from './Pages/Authentication/otp/otp.component';
import { UserProfileComponent } from './Pages/user-profile/user-profile.component';
import { SellersComponent } from './Pages/Electronics-Store/UserDashboard/Sections/sellers/sellers.component';
import { SubscriptionComponent } from './Pages/Authentication/subscriptions/subscription/subscription.component';
import { CentralLandingComponent } from './Pages/CentralLanding/central-landing/central-landing.component';

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./Pages/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      );
    },
  },
  {
    path:'landing',component:LandingFooterComponent
  },

  // <--------------------- User Auth Routes --------------------->

  {
    path: 'signup',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./Pages/Authentication/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      );
    },
  },{
    path:'verifyEmail', component:OtpComponent
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./Pages/Authentication/login/login.component').then(
        (m) => m.LoginComponent
      );
    },
  },
  // <--------------------- Profile Routee --------------------->

  {path:'userProfile', component:UserProfileComponent},

  // <--------------------- Admin Routes --------------------->

  {
    path: 'adminLogin',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/admin/admin-auth/admin-login/admin-login.component'
      ).then((m) => m.AdminLoginComponent);
    },
  },
  {
    path: 'adminDashboard',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/admin/admin-dashboard/admin-dashboard.component'
      ).then((m) => m.AdminDashboardComponent);
    },
  },

  // <--------------------- Electronics Store Routes --------------------->

  {
    path: 'electronics-store-home',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/electronics-store-home/electronics-store-home.component'
      ).then((m) => m.ElectronicsStoreHomeComponent);
    },
  },
  {
    path: 'electronics-store-see-more',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/electronics-store-home/electronics-see-more/electronics-see-more.component'
      ).then((m) => m.ElectronicsSeeMoreComponent);
    },
  },
  // <--------------------- Electronics Store Dashboard Routes --------------------->
  {
    path: 'electronics-user-dashboard',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/userdashboard/userdashboard.component'
      ).then((m) => m.UserdashboardComponent);
    },
  },
  {
    path: 'electronics-user-dashboard-home',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/home/home.component'
      ).then((m) => m.HomeComponent);
    },
    outlet: 'outlet2',
  },
  {
    path: 'electronics-user-dashboard-product',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/product/product.component'
      ).then((m) => m.ProductComponent);
    },
    outlet: 'outlet2',
  },{
    path: 'electronics-user-dashboard-review',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/review/review.component'
      ).then((m) => m.ReviewComponent);
    },
    outlet: 'outlet2',
  },
  {
    path: 'electronics-user-dashboard-auto-billing',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/billing/automate-billing/automate-billing.component'
      ).then((m) => m.AutomateBillingComponent);
    },
    outlet: 'outlet2',
  },{
    path: 'electronics-user-dashboard-manual-billing',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/billing/manual-billing/manual-billing.component'
      ).then((m) => m.ManualBillingComponent);
    },
    outlet: 'outlet2',
  },
  {
    path: 'electronics-user-dashboard-show-bills',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/billing/show-bills/show-bills.component'
      ).then((m) => m.ShowBillsComponent);
    },
    outlet: 'outlet2',
  },
  {
    path: 'electronics-user-dashboard-sellers',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/sellers/sellers.component'
      ).then((m) => m.SellersComponent);
    },
    outlet: 'outlet2',
  },
  // <--------------------- Grocery Store Routes --------------------->


  // <--------------------- Industrial Store Routes --------------------->


  
  // <--------------------- Grocery Store Dashboard Routes --------------------->
 


  
  {path:'electronics-myCart',component: MyCartComponent},
  {path:'electronics-showBilling', component: ShowBillsComponent, outlet:'outlet2'},
 {path:'electronics-autoBilling', component: AutomateBillingComponent, outlet:'outlet2'},
 {
  path: 'sellers', component:SellersComponent, outlet: 'outlet2'
  // This route is for the Sellers section in the Electronics Store User Dashboard
 },
 {
  path: 'subscription', component: SubscriptionComponent
 },
 {
  path: 'central-landing', component: CentralLandingComponent
 }

];

