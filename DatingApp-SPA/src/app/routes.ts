import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ListsComponent } from './components/lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    
    { path: 'members', component: MemberListComponent, canActivate: [AuthGuard]}, // Single path guarding

    { // Multiple path guarding using single Guard
        path: '', 
        runGuardsAndResolvers: 'always', 
        canActivate: [AuthGuard],
        children: [
            { path: 'messages', component: MessagesComponent},
            { path: 'lists', component: ListsComponent},
        ]
    },

    { path: '**', redirectTo: '', pathMatch: 'full'},
];
