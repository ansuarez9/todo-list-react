import { Item } from "./Item";

export interface EntryFieldProps {
    click: () => void;
    change: (event:any) => void;
    input: Item;
}