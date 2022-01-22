import { Item } from "./Item";

export interface ToDoState {
    historyList: { list: Item[] }[];
    input: Item;
    repeats: string[];
}