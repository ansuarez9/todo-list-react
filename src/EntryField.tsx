import { EntryFieldProps } from "./interfaces/EntryFieldProps";

function EntryField(props: EntryFieldProps) {
        return (
            <div className="mt-4">
                <h6>You can add more than one item using comma separated values.</h6>
                <input
                    type="text"
                    value={props.input.item}
                    onChange={props.change}
                />
                <button onClick={() => props.addItem(props.input)}>Add Item(s)</button>
            </div>
            
        );
}

export default EntryField;
