import { Observable } from 'rxjs';
import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, Validator } from '@angular/forms';
import { debounceTime, distinctUntilChanged, first } from 'rxjs/operators';

@Directive({
    selector: '[asyncValidator][formControlName], [asyncValidator][formControl], [asyncValidator][ngModel]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => AsyncValidator),
            multi: true
        }
    ]
})
export default class AsyncValidator implements Validator {
    validate(c: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
        // return this.validateUniqueEmailPromise(c.value);
        return this.validateUniqueEmailObservable(c.value).pipe(
            debounceTime(500),
            distinctUntilChanged(),
            first()
        );
    }

    // fake a Promise. In reality, the server should verify that the mail is unique or not
    validateUniqueEmailPromise(email: string) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (email === 'alreadyExistsEmail@gmail.com') {
                    resolve({
                        asyncInvalid: true
                    });
                } else {
                    resolve(null);
                }
            }, 2000);
        });
    }

    validateUniqueEmailObservable(email: string) {
        return new Observable(observer => {
            if (email === 'alreadyExistsEmail@gmail.com') {
                observer.next({ asyncInvalid: true });
            } else {
                observer.next(null);
            }
        });
    }
}