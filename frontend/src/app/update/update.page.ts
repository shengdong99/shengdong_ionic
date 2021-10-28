import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { CarCrudService } from '../services/coche-crud.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})

export class UpdatePage implements OnInit {

  updateCarFg: FormGroup;
  id: any;

  constructor(
    private CarCrudService: CarCrudService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchCar(this.id);
    this.updateCarFg = this.formBuilder.group({
      name: [''],
      year: [''],
      cost: ['']
    })
  }

  fetchCar(id) {
    this.CarCrudService.getCar(id).subscribe((data) => {
      this.updateCarFg.setValue({
        name: data['name'],
        year: data['year'],
        cost: data['cost']
      });
    });
  }

  onSubmit() {
    if (!this.updateCarFg.valid) {
      return false;
    } else {
      this.CarCrudService.updateCar(this.id, this.updateCarFg.value)
        .subscribe(() => {
          this.updateCarFg.reset();
          this.router.navigate(['/list']);
        })
    }
  }

}