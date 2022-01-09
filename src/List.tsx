import React from "react";
import { Item } from "./interfaces/Item";
import { ListProps } from "./interfaces/ListProps";


function List(props: ListProps) {
    return (
        <ul>
            {props.list.map((itemObj: Item, idx: number) => {
                let editing;
                if(itemObj.editing){
                    editing = <span className="editing"> (editing)</span>
                }
                return (
                    <li key={idx}>
                        <span className="remove" data-idx={idx} onClick={props.remove}>X</span>
                        <span data-idx={idx} onClick={props.edit} className="editableItem">{itemObj.item}</span>
                        {editing}
                    </li>
                );
            })}
        </ul>
    )
}

export default List;