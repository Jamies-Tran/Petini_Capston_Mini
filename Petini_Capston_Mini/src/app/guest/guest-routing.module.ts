import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ShopComponent } from '../shop/shop.component';
import { PetComponent } from '../pet/pet.component';
import { ServiceComponent } from '../service/service.component';
import { ItemsComponent } from '../items/items.component';
import { PetDetailComponent } from '../pet-detail/pet-detail.component';
import { ProfileComponent } from '../profile/profile.component';
import { OrderDetailComponent } from '../cart-order/order-detail/order-detail.component';
import { HistoryOrderComponent } from '../cart-order/history-order/history-order.component';
import { ViewCartComponent } from '../cart-order/view-cart/view-cart.component';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';
import { BookingComponent } from '../booking/booking.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'Shop', component: ShopComponent },
  {
    path: 'Shop',

    children: [
      {
        path: 'Items',
        component: ItemsComponent,
      },
    ],
  },
  { path: 'Pet', component: PetComponent },
  {
    path: 'Pet',

    children: [
      {
        path: 'PetDetail',
        component: PetDetailComponent,
      },
    ],
  },
  { path: 'Service', component: ServiceComponent },
  {
    path: 'Service',
    children: [
      {
        path: 'ServiceDetail',
        component: ServiceDetailComponent,
      },
    ],
  },
  { path: 'Profile', component: ProfileComponent },
  { path: 'Cart', component: ViewCartComponent },
  { path: 'History', component: HistoryOrderComponent },
  { path: 'Order', component: OrderDetailComponent },
  { path: 'Booking', component: BookingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule {}
