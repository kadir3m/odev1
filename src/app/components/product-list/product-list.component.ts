import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ExplorerService} from '../../services/explorer.service';
import {ProductDto} from '../model/product.dto';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products = new Array<ProductDto>();
  explorerStrem: Subscription;
  constructor(private router: Router,
              private explorerService: ExplorerService) {
    this.explorerStrem = this.explorerService.getAllProduct().subscribe(response => {
      this.products = response;
    })
  }
  ngOnInit(): void {
  }

  goToNew() {
    this.explorerService.setEntityConfig({mode: 'add', product: {}});
    this.router.navigateByUrl('/child');
  }
  editProduct(product: ProductDto) {
    this.explorerService.setEntityConfig({mode: 'edit', product: product})
  }
  viewProduct(product: ProductDto) {
    this.explorerService.setEntityConfig({mode: 'view', product: product})
  }
  delete(product: ProductDto) {
    if (confirm('Kayıt silinsin mi')) {
      this.explorerService.deleteProduct(product)
    }
  }
  ngOnDestroy() {
    this.explorerStrem.unsubscribe();
  }
}
