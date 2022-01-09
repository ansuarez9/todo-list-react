import React from "react";
import { Item } from "./interfaces/Item";

interface ListProps {
    list: Item[];
    remove: (e: any) => void;
    edit: (e:any) => void;
}

class List extends React.Component<ListProps> {
    constructor(props: ListProps){
        super(props);
    }

    render() {
        return (
            <ul>
                {this.props.list.map((itemObj: Item, idx: number) => {
                    let editing;
                    if(itemObj.editing){
                        editing = <span className="editing"> (editing)</span>
                    }
                    return (
                        <li key={idx}>
                            <span className="remove" data-idx={idx} onClick={this.props.remove}>X</span>
                            <span data-idx={idx} onClick={this.props.edit} className="editableItem">{itemObj.item}</span>
                            {editing}
                        </li>
                    );
                })}
            </ul>
        )
    }
}

export default List;