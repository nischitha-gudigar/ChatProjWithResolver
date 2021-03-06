import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatDisplayComponent } from './chat-display/chat-display.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { chatLoadReducer } from './store/chat-load.reducer';
import { chatSaveReducer } from './store/chat-store.reducer';
import { ChatListResolver } from './chat-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'contacts',
    component: ChatListComponent,
    resolve: { resolvedData: ChatListResolver }
  },
  { path: 'chat/:id', component: ChatDisplayComponent },
  { path: 'Error', component: PageNotFoundComponent },
  { path: '', redirectTo: 'contacts', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      contacts: chatLoadReducer,
      messages: chatSaveReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  declarations: [
    AppComponent,
    ChatListComponent,
    ChatDisplayComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
