import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appCheckForumType]',
  providers: [{provide: NG_VALIDATORS, useExisting: CheckForumTypeDirective, multi: true}]

})
export class CheckForumTypeDirective {
  // @Input('tagValidator') tags: string[];

  static checkDblicate(tags :string[]){
 
    return (control:AbstractControl ) : {[key : string] : any} | null => {
      // console.log(tags)
      // const lowerTags = []
      // for(let i in tags){
      //   lowerTags.push(tags[i].toLowerCase());
      // }
      // console.log(lowerTags)    
      const type : string = control.value; 
      const hashTag = tags.indexOf(type) > -1;
      // const hashTag =  JSON.stringify(tags).toLowerCase().indexOf(type.toLowerCase()) > -1
      console.log(type)
      if(type === ''){
      return null
      }
      else if(hashTag){
        return { checkDblicate: true }
      }
      else{
        return null;
      }
    };
  };
}



