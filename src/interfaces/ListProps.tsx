import { Item } from "./Item";

export interface ListProps {
    list: Item[];
    remove: (e: any) => void;
    edit: (e:any) => void;
}