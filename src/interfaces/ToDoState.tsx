import { Item } from "./Item";

export interface ToDoState {
    list: Item[];
    input: Item;
    repeats: string[];
}