import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ListsComponent } from './components/lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]}, // Single path guarding

    { // Multiple path guarding using single Guard
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent},
            { path: 'members/:id', component: MemberDetailComponent},
            { path: 'lists', component: ListsComponent},
        ]
    },

    { path: '**', redirectTo: '', pathMatch: 'full'},
];
