import { Countries } from '@/entities/Country';
import { Currencies } from '@/entities/Currency';

export interface ProfileType {
    id?: number
    firstname?: string,
    lastname?: string,
    age?: number,
    currency?: Currencies,
    country?: Countries,
    city?: string,
    username?: string,
    avatar?: string
}
