import { Item } from "./Item";

export interface EntryFieldProps {
    addItem: (item: Item) => void;
    change: (event:any) => void;
    input: Item;
}