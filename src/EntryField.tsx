import React from "react";
import { Item } from "./interfaces/Item";

interface EntryFieldProps {
    click: () => void;
    change: (event:any) => void;
    input: Item;
}

class EntryField extends React.Component<EntryFieldProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <h4>You can add more than 1 using comma separated values.</h4>
                <input
                    type="text"
                    value={this.props.input.item}
                    onChange={this.props.change}
                />
                <button onClick={this.props.click}>Add Item(s)</button>
            </div>
            
        );
    }
}

export default EntryField;
