import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { ShopOwnerRoutingModule } from './shop-owner-routing.module';
import { ShopOwnerComponent } from './shop-owner.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MatIconModule } from '@angular/material/icon';
import { AddItemsComponent } from './manage-item/add-items/add-items.component';
import { matFormFieldAnimations, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { ManageItemComponent } from './manage-item/manage-item.component';
import { ManagePetComponent } from './manage-pet/manage-pet.component';
import { ManageServiceComponent } from './manage-service/manage-service.component';
import { AccountDetailComponent } from './manage-account/account-detail/account-detail.component';
import { AddAccountComponent } from './manage-account/add-account/add-account.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { ItemDetailComponent } from './manage-item/item-detail/item-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ServiceDetailComponent } from './manage-service/service-detail/service-detail.component';
import { AddServiceComponent } from './manage-service/add-service/add-service.component';



@NgModule({
  declarations: [
    ShopOwnerComponent,
    AddItemsComponent,
    ManageAccountComponent,
    ManageItemComponent,
    ManagePetComponent,
    ManageServiceComponent,
    AccountDetailComponent,
    AddAccountComponent,
    ItemDetailComponent,
    ManageOrderComponent,
    ServiceDetailComponent,
    AddServiceComponent
  ],
  imports: [
    CommonModule,
    ShopOwnerRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MdbCarouselModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NgxDropzoneModule,
    MatMenuModule,
    MatTableModule,
    MatTableModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatSelectModule,
    MatTabsModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class ShopOwnerModule { }
