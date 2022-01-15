import { Input } from "./Input";
import { Item } from "./Item";

export interface ToDoState {
    list: Item[];
    input: Input;
    repeats: string[];
}