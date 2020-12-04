import { InjectionToken } from '@angular/core';

export type LAZY_MODULES = {
  chatSettings: string;
};

export const lazyMap: LAZY_MODULES = {
    chatSettings: 'src/app/chat/chat.module#ChatModule'
};

export const LAZY_MODULES_MAP = new InjectionToken('LAZY_MODULES_MAP', {
  factory: () => lazyMap
});