import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ErrorScrollingService {
  constructor() {}

  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  scrollToError(selector: string): void {
    const firstElementWithError = document.querySelector(selector);
    this.scrollTo(firstElementWithError);
  }

  // scrollToImageError(): void {
  //   const firstElementWithError = document.querySelector(
  //     ".upload_progress .text-danger"
  //   );
  //   this.scrollTo(firstElementWithError);
  // }
}
