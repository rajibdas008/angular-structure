import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'junctionNameFilter'
})
export class JunctionFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLocaleLowerCase();
        return items.filter(it => {
            return it.name.toLocaleLowerCase().includes(searchText);
        });
    }
}
