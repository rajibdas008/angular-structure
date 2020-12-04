import { Injectable, Output, EventEmitter } from '@angular/core';

export enum HeaderType {
    BEFORE_LOGIN,
    AFTER_LOGIN,
    CHAT_HEADER
}

export interface HeaderMetaData {
    hideHeader: boolean;
    headerType?: HeaderType;
}

@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    @Output() headerChangeEvent: EventEmitter<any> = new EventEmitter();
    headerMeta = {} as HeaderMetaData;

    constructor() { }

    notifyHeaderChange(headerMeta: HeaderMetaData) {
        this.headerMeta = headerMeta;
        this.headerChangeEvent.emit(headerMeta);
    }

    getHeaderMeta() {
        return this.headerMeta;
    }

    hideHeader() {
        const headerMeta = this.getHeaderMeta();
        headerMeta.hideHeader = true;
        this.notifyHeaderChange(headerMeta);
    }

    showHeader() {
        const headerMeta = this.getHeaderMeta();
        headerMeta.hideHeader = false;
        this.notifyHeaderChange(headerMeta);
    }

    changeHeader(headerType: HeaderType) {
        const headerMeta = this.getHeaderMeta();
        headerMeta.hideHeader = false;
        headerMeta.headerType = headerType;
        this.notifyHeaderChange(headerMeta);
    }
}
