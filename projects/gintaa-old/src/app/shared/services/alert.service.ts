import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class AlertService {

    config: object;

    constructor(
        private toastrService: ToastrService
    ) {
       this.setOptions();
    }

    setOptions() {
        this.config = {
            enableHtml: true,
            closeButton: true,
            timeOut: 5000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing',
            easing: 'ease-in',
            easeTime: 1000
        };
    }

    showHtmlMessage(message: string, options?: any) {
        let config = this.config;
        if (options) {
            config = options;
        }
        this.toastrService.show(message, '' , config);
    }

    showMessage(message: string, options?: any) {
        let config = this.config;
        if (options) {
            config = options;
        }
        this.toastrService.show(message, '' , config);
    }

    showInfo(info: string, options?: any) {
        let config = this.config;
        if (options) {
            config = options;
        }
        this.toastrService.success(info, '' , config);
    }

}
