import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyConnectsComponent } from './my-connects/my-connects.component';
import { MyNotesComponent } from './my-notes/my-notes.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { ProfileComponent } from './myProfile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './guard/auth.guard';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//angular material modules
import { MatTableModule } from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { MatCardModule} from '@angular/material/card';
import { MatStepperModule} from '@angular/material/stepper';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTabsModule} from '@angular/material/tabs';
import { MatPaginatorModule} from '@angular/material/paginator';
import { ReadNotesComponent } from './read-notes/read-notes.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

//routes
// canActivate:[AuthGuard]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    HomeComponent,
    LoginComponent,
    MyConnectsComponent,
    MyNotesComponent,
    NewNoteComponent,
    ProfileComponent,
    SignupComponent,
    ReadNotesComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
