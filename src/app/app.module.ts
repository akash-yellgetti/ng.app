import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { AdminModule } from './shared/modules/admin/admin.module';
import { AuthModule } from './shared/modules/auth/auth.module';
import { CommunicationModule } from './shared/modules/communication/communication.module';
import { AccountsModule } from './shared/modules/accounts/accounts.module';
import { TrackerModule } from './shared/modules/tracker/tracker.module';
import { FormBuilderModule } from './shared/modules/form-builder/form-builder.module';
import { PathologyModule } from './modules/pathology/pathology.module';
import { MarketModule } from './modules/market/market.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './shared/modules/layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AdminModule,
    AuthModule,
    CommunicationModule,
    AccountsModule,
    TrackerModule,
    FormBuilderModule,
    PathologyModule,
    MarketModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
