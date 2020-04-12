import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { LikesListComponent } from './components/likes-list/likes-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { LikesListResolver } from './_resolvers/likes-list.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { RegisterComponent } from './components/register/register.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'messages',
    component: MessagesComponent,
    resolve: { messages: MessagesResolver },
    canActivate: [AuthGuard],
  }, // Single path guarding
  {
    // Multiple path guarding using single Guard
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver },
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges],
      },
      {
        path: 'likes',
        component: LikesListComponent,
        resolve: { users: LikesListResolver },
      },
    ],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
