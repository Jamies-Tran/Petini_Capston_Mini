import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AfterCareService } from '../services/after-care.service';
import { PetService } from '../services/pet.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  message: any;
  valueProduct: any[] = [];
  valueService: any[] = [];
  valuePet: any[] = [];

  constructor(
    private httpProduct: ProductService,
    private httpService: AfterCareService,
    private httpPet: PetService,
    private image: ImageService
  ) {}
  ngOnInit(): void {
    // Product
    try {
      this.httpProduct.getProductList().subscribe(
        async (data) => {
          this.valueProduct = [];
          console.log('data:', data);
          if (data) {
            let value = data;
            console.log('value:', value);
            for (let i = 0; i <= 4; i++) {
              if (value[i] != undefined) {
                var imgUrl = await this.image.getImage(
                  'items/' + value[i].imageUrl
                );
                console.log('imaURL:', imgUrl);
                let name = value[i].name;
                let price = value[i].price;
                this.valueProduct.push({
                  name: name,
                  price: price,
                  imageUrl: imgUrl,
                });
              }
            }
            console.log('product:', this.valueProduct);
          }
        },
        (error) => {
          console.log('error', error);
        }
      );
    } catch (error) {
      console.log('error', error);
    }

    // Service
    try {
      this.httpService.getServiceList().subscribe(
        async (data) => {
          this.valueService = [];
          console.log('data:', data);
          if (data) {
            let value = data;
            console.log('value:', value);
            for (let i = 0; i <= 4; i++) {
              if (value[i] != undefined) {
                var imgUrl = await this.image.getImage(
                  'services/' + value[i].imageUrl
                );
                console.log('imaURL:', imgUrl);
                let name = value[i].name;
                let price = value[i].price;
                this.valueService.push({
                  name: name,
                  price: price,
                  imageUrl: imgUrl,
                });
              }
            }
            console.log('service:', this.valueService);
          }
        },
        (error) => {
          console.log('error', error);
        }
      );
    } catch (error) {
      console.log('error', error);
    }

    // Pet
    try {
      this.httpPet.getPetListByStatus('NOT_ADOPTED').subscribe(
        async (data) => {
          this.valuePet = [];
          console.log('data:', data);
          if (data) {
            let value = data;
            console.log('value:', value);
            for (let i = 0; i <= 4; i++) {
              if (value[i] != undefined) {
                var imgUrl = await this.image.getImage(
                  'pets/' + value[i].imageUrl
                );
                console.log('imaURL:', imgUrl);
                let name = value[i].name;
                let price = value[i].price;
                this.valuePet.push({
                  name: name,
                  price: price,
                  imageUrl: imgUrl,
                });
              }
            }
            console.log('pet:', this.valuePet);
          }
        },
        (error) => {
          console.log('error', error);
        }
      );
    } catch (error) {
      console.log('error', error);
    }

  }

  public onItemSelector(name: string) {
    localStorage.setItem('getItemsName', name);
  }

  public onServiceSelector(name: string) {
    localStorage.setItem('getServiceName', name);
  }

  public onPetSelector(name: string) {
    localStorage.setItem('getPetName', name);
  }
}
