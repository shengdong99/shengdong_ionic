import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

export class Car {
  id: number;
  name: string;
  year: number;
  cost: number;
}

@Injectable({
  providedIn: 'root'
})

export class CarCrudService {

  endpoint: string = 'http://localhost:8080/coche';

  

  constructor(private httpClient: HttpClient) { }

  createCar(car: Car): Observable<Car> {
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", car.name);
    bodyEncoded.append("year", car.year.toString());
    bodyEncoded.append("cost", car.cost.toString());
    const body = bodyEncoded.toString();
    return this.httpClient.post<Car>(this.endpoint, body, httpOptions)
      .pipe(
        catchError(this.handleError<Car>('Error occured'))
      );
  }

  getCar(id): Observable<Car[]> {
    return this.httpClient.get<Car[]>(this.endpoint + '/' + id)
      .pipe(
        tap(_ => console.log(`Car fetched: ${id}`)),
        catchError(this.handleError<Car[]>(`Get car id=${id}`))
      );
  }

  getCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(this.endpoint)
      .pipe(
        tap(cars => console.log('Cars retrieved!')),
        catchError(this.handleError<Car[]>('Get car', []))
      );
  }

  updateCar(id, car: Car): Observable<any> {
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", car.name);
    bodyEncoded.append("year", car.year.toString());
    bodyEncoded.append("cost", car.cost.toString());
    const body = bodyEncoded.toString();
    return this.httpClient.put(this.endpoint + '/' + id, body, httpOptions)
      .pipe(
        tap(_ => console.log(`Car updated: ${id}`)),
        catchError(this.handleError<Car[]>('Update car'))
      );
  }

  deleteCar(id): Observable<Car[]> {
    return this.httpClient.delete<Car[]>(this.endpoint + '/' + id, httpOptions)
      .pipe(
        tap(_ => console.log(`Car deleted: ${id}`)),
        catchError(this.handleError<Car[]>('Delete car'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  
  
}