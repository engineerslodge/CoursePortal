import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CustomerDashBoardComponent } from './customer-dash-board/customer-dash-board.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './Shared/auth-guard.guard';
import { RoleGuard } from './Shared/role-guard.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { NavComponent } from './Admin/nav/nav.component';
import { SidebarAdminComponent } from './Admin/sidebar-admin/sidebar-admin.component';
import { CustomerComponent } from './Admin/customer/customer.component';
import { CategooryComponent } from './Admin/categoory/categoory.component';
import { UploadCourseComponent } from './Admin/upload-course/upload-course.component';
import { PayHistoryComponent } from './Admin/pay-history/pay-history.component';
import { CalendarComponent } from './Admin/calendar/calendar.component';
import { CourseViewComponent } from './Admin/course-view/course-view.component';
import { EditCourseComponent } from './Admin/edit-course/edit-course.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { WebcamModule } from 'ngx-webcam';
import { MarketComponent } from './market/market.component';
import { ClassHistoryComponent } from './class-history/class-history.component';
import { NotesComponent } from './notes/notes.component';
import { PayStatusComponent } from './pay-status/pay-status.component';
import { ScreenViewComponent } from './screen-view/screen-view.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { PayNowComponent } from './pay-now/pay-now.component';
import { LiveCamComponent } from './live-cam/live-cam.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibraryComponent } from './library/library.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { PreviewsComponent } from './Admin/previews/previews.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    NotFoundComponent,
    PaymentStatusComponent,
    SidebarComponent,
    FooterComponent,
    NavBarComponent,
    CustomerDashBoardComponent,
    UnauthorizedComponent,
    DashboardComponent,
    NavComponent,
    SidebarAdminComponent,
    CustomerComponent,
    CategooryComponent,
    UploadCourseComponent,
    PayHistoryComponent,
    CalendarComponent,
    CourseViewComponent,
    EditCourseComponent,
    MarketComponent,
    ClassHistoryComponent,
    NotesComponent,
    PayStatusComponent,
    ScreenViewComponent,
    WaitingRoomComponent,
    PayNowComponent,
    LiveCamComponent,
    LibraryComponent,
    CourseInfoComponent,
    PreviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    WebcamModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 

  ],
  providers: [AuthGuard,RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
