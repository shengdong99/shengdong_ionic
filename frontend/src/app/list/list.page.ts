import { Component, OnInit } from '@angular/core';
import { CarCrudService } from '../services/coche-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})

export class ListPage implements OnInit {

  Cars: any = [];

  constructor( 
    private carCrudService: CarCrudService,
    private router: Router
  ) { }

  ngOnInit() {  }

  ionViewDidEnter() {
    this.carCrudService.getCars().subscribe((response) => {
      this.Cars = response;
    })
  }

  removeCar(car, i) {
    if (window.confirm('Are you sure')) {
      this.carCrudService.deleteCar(car.id)
      .subscribe(() => {
          this.ionViewDidEnter();
          console.log('Car deleted!')
        }
      )
    }
  }

}
