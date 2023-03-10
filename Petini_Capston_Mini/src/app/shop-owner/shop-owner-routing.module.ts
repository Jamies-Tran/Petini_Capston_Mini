import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemsComponent } from './manage-item/add-items/add-items.component';
import { ShopOwnerComponent } from './shop-owner.component';
import { ManageItemComponent } from './manage-item/manage-item.component';
import { ItemDetailComponent } from './manage-item/item-detail/item-detail.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { AccountDetailComponent } from './manage-account/account-detail/account-detail.component';
import { AddAccountComponent } from './manage-account/add-account/add-account.component';
import { ProfileComponent } from '../profile/profile.component';
import { ManageServiceComponent } from './manage-service/manage-service.component';

const routes: Routes = [
  {
    path: '',
    component: ShopOwnerComponent,
    children: [
      {
        path: 'Items',
        component: ManageItemComponent,
      },
      {
        path: 'Items',
        children: [
          {
            path: 'AddItems',
            component: AddItemsComponent,
          },
          {
            path: 'ItemsDetail',
            component: ItemDetailComponent,
          },
        ],
      },
      {
        path: 'Account',
        component: ManageAccountComponent,
      },
      {
        path: 'Account',
        children: [
          {
            path: 'AccountDetail',
            component: AccountDetailComponent,
          },
          {
            path:'AddAccount',
            component:AddAccountComponent
          },
        ],
      },
      {path: 'Profile' , component: ProfileComponent},
      {path:'Service' , component:ManageServiceComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopOwnerRoutingModule {}
