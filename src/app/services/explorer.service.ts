import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ProductDto} from '../components/model/product.dto';
import {Router} from '@angular/router';

export interface EntityConfig {
  mode: string;
  product: ProductDto;
}
@Injectable({
  providedIn: 'root'
})

export class ExplorerService {

  constructor(private router: Router) { }
  private productStream: BehaviorSubject<any> = new BehaviorSubject(null);
  productStream$ = this.productStream.asObservable();
  private entityConfigStream: BehaviorSubject<any> = new BehaviorSubject(null);
  entityConfigStream$ = this.entityConfigStream.asObservable();
  products = new Array<ProductDto>();

  addProduct(product: ProductDto) {
    if (this.products.length > 0) {
      const maxIndex: any = this.products.map(data => data.id).reduce((acc: any, curr: any): any => {
        return Math.max(acc, curr);
      }, 0)
      Object.assign(product, {id: maxIndex + 1 })
    } else {
      Object.assign(product, {id: 1 })
    }
    this.products.push(product);
    this.productStream.next(this.products);
  }
  getAllProduct() {
   return this.productStream;
  }

  setEntityConfig(entityConfig: EntityConfig) {
    this.entityConfigStream.next(entityConfig);
    this.router.navigateByUrl('/child')
  }
  deleteProduct(product: ProductDto): any {
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }

}
