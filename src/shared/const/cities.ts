import { Countries } from 'shared/const/countries';

export type CityItem = {
    name: string
}
export const Cities: Record<Countries, CityItem[]> = {
    [Countries.RUSSIA]: [
        {
            name: 'Moscow',
        },
    ],
    [Countries.ARMENIA]: [],
    [Countries.BELARUS]: [],
    [Countries.UKRAINE]: [],
    [Countries.KAZAKHSTAN]: [],
};
