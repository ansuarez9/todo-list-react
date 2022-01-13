import { useState } from "react";
import { Item } from "./interfaces/Item";

interface ListItemProps {
    itemObj: Item,
    actions: {
        remove: (e: any) => void,
        edit: (e: any) => void
    }
    idx: number | null
}

function ListItem(props: ListItemProps ) {
    const k = props.idx;
    console.log(`${k}: ${props.itemObj.item}`);
    const [strikethrough, setStrikethrough] = useState(false);

    function handleRemove(k: number | null) {
        if(strikethrough){
            return props.actions.remove(k)
        } else {
            setStrikethrough(true);
        }
    }

    function handleEdit(k: number | null) {
        if(strikethrough) {
            return false;
        }
        return props.actions.edit(k);
    }

    let editing;
    if(props.itemObj.editing){
        editing = <span className="editing"> (editing)</span>
    }
    return (
        <li>
            <span onClick={() => handleRemove(k)} className="remove">X</span>
            <span onClick={() => handleEdit(k)} className={strikethrough ? 'strikethrough' : 'editableItem'}>
                {props.itemObj.item}
            </span>
            {editing}
        </li>
    )
}

export default ListItem;