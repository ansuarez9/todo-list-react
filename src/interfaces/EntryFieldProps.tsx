import { Input } from "./Input";

export interface EntryFieldProps {
    addItem: (item: Input) => void;
    change: (event:any) => void;
    input: Input;
}