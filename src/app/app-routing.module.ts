import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { RegisterComponent } from './register/register.component';
import { CustomerDashBoardComponent } from './customer-dash-board/customer-dash-board.component';
import { AuthGuard } from './Shared/auth-guard.guard';
import { RoleGuard } from './Shared/role-guard.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { CustomerComponent } from './Admin/customer/customer.component';
import { CategooryComponent } from './Admin/categoory/categoory.component';
import { UploadCourseComponent } from './Admin/upload-course/upload-course.component';
import { PayHistoryComponent } from './Admin/pay-history/pay-history.component';
import { CalendarComponent } from './Admin/calendar/calendar.component';
import { CourseViewComponent } from './Admin/course-view/course-view.component';
import { EditCourseComponent } from './Admin/edit-course/edit-course.component';
import { MarketComponent } from './market/market.component';
import { NotesComponent } from './notes/notes.component';
import { ClassHistoryComponent } from './class-history/class-history.component';
import { PayStatusComponent } from './pay-status/pay-status.component';
import { ScreenViewComponent } from './screen-view/screen-view.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { PayNowComponent } from './pay-now/pay-now.component';
import { LiveCamComponent } from './live-cam/live-cam.component';

const routes: Routes = [
  {path: '', redirectTo: '/Login', pathMatch: 'full' },
  {path: 'Login', component: LoginComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'Forgot', component: ForgotComponent},
  {path: 'dashboard', component: CustomerDashBoardComponent,canActivate:[AuthGuard,RoleGuard], data:{ requiredRole: 'Customer' },},
  {path: 'market', component: MarketComponent,canActivate:[AuthGuard,RoleGuard], data:{ requiredRole: 'Customer' },},
  {path: 'pricing', component: NotesComponent,canActivate:[AuthGuard,RoleGuard], data:{ requiredRole: 'Customer' },},
  {path: 'classHistory', component: ClassHistoryComponent,canActivate:[AuthGuard,RoleGuard], data:{ requiredRole: 'Customer' },},
  {path: 'PayStatus', component: PayStatusComponent,canActivate:[AuthGuard,RoleGuard], data:{ requiredRole: 'Customer' },},
  {path: 'LiveClass', component: ScreenViewComponent,canActivate:[AuthGuard,RoleGuard], data:{ requiredRole: 'Customer' },},
  {path: 'WaitingRoom', component: WaitingRoomComponent,canActivate:[AuthGuard,RoleGuard], data:{ requiredRole: 'Customer' },},
  {path: 'PayNow', component: PayNowComponent,canActivate:[AuthGuard,RoleGuard], data:{ requiredRole: 'Customer' },},
  {path: 'Livecam', component: LiveCamComponent,},


  // admin Routing Table 
  {path:'unauthorized' , component:UnauthorizedComponent},
  {path:'adminHome' , component:DashboardComponent , canActivate:[AuthGuard,RoleGuard], data:{requiredRole : 'Admin'},},
  {path:'adminCustomer' , component:CustomerComponent , canActivate:[AuthGuard,RoleGuard], data:{requiredRole : 'Admin'},},
  {path:'adminCategory' , component:CategooryComponent , canActivate:[AuthGuard,RoleGuard], data:{requiredRole : 'Admin'},},
  {path:'adminUpload' , component:UploadCourseComponent , canActivate:[AuthGuard,RoleGuard], data:{requiredRole : 'Admin'},},
  {path:'adminPay' , component:PayHistoryComponent , canActivate:[AuthGuard,RoleGuard], data:{requiredRole : 'Admin'},},
  {path:'adminCalendar' , component:CalendarComponent , canActivate:[AuthGuard,RoleGuard], data:{requiredRole : 'Admin'},},
  {path:'adminViews' , component:CourseViewComponent , canActivate:[AuthGuard,RoleGuard], data:{requiredRole : 'Admin'},},
  {path:'adminEditCourse' , component:EditCourseComponent , canActivate:[AuthGuard,RoleGuard], data:{requiredRole : 'Admin'},},
  {path: 'Calendar', component: CalendarComponent,canActivate:[AuthGuard,RoleGuard], data:{ requiredRole: 'Admin' },},

  // admin routing ends 
  {path : 'PayStatus', component: PaymentStatusComponent},
  {path: '**' , component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  
 }
