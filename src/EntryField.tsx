import Octicon from "react-component-octicons";
import { EntryFieldProps } from "./interfaces/EntryFieldProps";
import { Item } from "./interfaces/Item";

function EntryField(props: EntryFieldProps) {
    const invalidInput = props.input.item.length === 0;
    
    function handleAddItem(input: Item){
        if(invalidInput){
            return;
        }
        props.addItem(input);
    }

    return (
        <div className="mt-4">
            <h6>You can add more than one item using comma separated values.</h6>
            <input
                type="text"
                value={props.input.item}
                onChange={props.change}
            />
            <span className={"addItem " + (invalidInput ? 'disabled' : '')} onClick={() => handleAddItem(props.input)}>
                <Octicon name="plus"/>
            </span>
        </div>
    );
}

export default EntryField;
