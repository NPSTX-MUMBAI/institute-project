import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessageService } from 'primeng/api';
import { UiModule } from './ui/ui.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './guards/authInterceptor';
// import { StudentModule } from './components/student/student.module';
import { JwtModule, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
    declarations: [AppComponent, NotfoundComponent, DashboardComponent,],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        UiModule,
        HttpClientModule,
        NgxUiLoaderModule,
        NgxUiLoaderHttpModule.forRoot({
            showForeground: true,
        }),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        MessageService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

        JwtHelperService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
