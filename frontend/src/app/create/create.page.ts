import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CarCrudService } from '../services/coche-crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})

export class CreatePage implements OnInit {

  carForm: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private carCrudService: CarCrudService    
  ) {
    this.carForm = this.formBuilder.group({
      name: ['', Validators.required],
      year: ['', Validators.required],
      cost: ['', Validators.required]
    })
  }

  ngOnInit() { }

  onSubmit() {
    if (!this.carForm.valid) {
      return false;
    } else {
      this.carCrudService.createCar(this.carForm.value).subscribe((response) => {
          this.zone.run(() => {
            this.carForm.reset();
            this.router.navigate(['/list']);
          })
        });
    }
  }

}
