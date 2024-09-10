import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  constructor(private router: Router) {}

  handleError = (error: HttpErrorResponse) => {
    switch (error.status) {
      case 0:
        console.error("An error occurred: ", error);
        break;
      case 404:
        this.router.navigateByUrl("404");
        return throwError(() => new Error('Page not found'));
    }
    return throwError(() => new Error('An error occurred'));
  }
}