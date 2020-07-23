import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myForumfilter',
    pure: false
})
export class MyForumFilterPipe implements PipeTransform {
    transform(child: any[], filter: string): any {
        if (!child || !filter) {
            return child;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        // return child.filter(item => item.title.indexOf(filter.title) !== -1);
        return child.filter((data) =>  JSON.stringify(data.type).toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}