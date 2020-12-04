import { Injectable, Output, EventEmitter } from '@angular/core';

export enum FooterType {
    DEFAULT
}

export interface FooterMetaData {
    hideFooter: boolean;
    footerType?: FooterType;
}

@Injectable({
    providedIn: 'root'
})
export class FooterService {

    @Output() footerChangeEvent: EventEmitter<any> = new EventEmitter();
    footerMeta = {} as FooterMetaData;

    constructor() { }

    notifyFooterChange(footerMeta: FooterMetaData) {
        this.footerMeta = footerMeta;
        this.footerChangeEvent.emit(footerMeta);
    }

    getFooterMeta() {
        return this.footerMeta;
    }

    hideFooter() {
        const footerMeta = this.getFooterMeta();
        footerMeta.hideFooter = true;
        this.notifyFooterChange(footerMeta);
    }

    showFooter() {
        const footerMeta = this.getFooterMeta();
        footerMeta.hideFooter = false;
        this.notifyFooterChange(footerMeta);
    }
    changeFooter(footerType: FooterType) {
        const footerMeta = this.getFooterMeta();
        footerMeta.hideFooter = false;
        footerMeta.footerType = footerType;
        this.notifyFooterChange(footerMeta);
    }
}
