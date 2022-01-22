import { Item } from "./Item";

export interface ListProps {
    currentList: Item[];
    remove: (e: any) => void;
    edit: (e:any) => void;
}