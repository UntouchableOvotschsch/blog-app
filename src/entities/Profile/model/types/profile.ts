import { Currencies } from 'shared/const/currencies';
import { Countries } from 'shared/const/countries';
import { Cities } from 'shared/const/cities';

export interface ProfileType {
    'firstname': string,
    'lastname': string,
    'age': number,
    'currency': keyof Currencies,
    'country': keyof Countries,
    'city': typeof Cities,
    'username': string,
    'avatar': string
}

export interface ProfileSchema {
    data?: ProfileType,
    isLoading: boolean,
    error?: string
    editable: boolean

}
