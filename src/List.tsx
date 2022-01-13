import React from "react";
import { Item } from "./interfaces/Item";
import { ListProps } from "./interfaces/ListProps";
import ListItem from "./ListItem";


function List(props: ListProps) {
    const actions = {
        remove: props.remove,
        edit: props.edit
    };

    return (
        <ul>
            {props.list.map((itemObj: Item, idx: number | null) => {
                return (
                    <ListItem key={itemObj.idx} idx={itemObj.idx} itemObj={itemObj} actions={actions} />
                );
            })}
        </ul>
    )
}

export default List;