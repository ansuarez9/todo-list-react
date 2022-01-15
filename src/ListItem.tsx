import { useEffect, useRef, useState } from "react";
import usePrevious from "./hooks/UsePrevious";
import { Item } from "./interfaces/Item";

interface ListItemProps {
    itemObj: Item,
    actions: {
        remove: (e: any) => void,
        edit: (e: any, undo?: boolean) => void
    }
    idx: number | null
}

function ListItem(props: ListItemProps ) {
    const k = props.idx;
    const [strikethrough, setStrikethrough] = useState(false);
    const [enableEdit, setEnableEdit] = useState(false);

    const prevValue = usePrevious(props.itemObj.item);
    
    useEffect(() => {
        if(!!prevValue && prevValue !== props.itemObj.item){
            setEnableEdit(false);
        }
    }, [props.itemObj.item]);

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

        setEnableEdit(true);
        return props.actions.edit(k);
    }

    function handleUndoClick() {
        if(strikethrough){
            setStrikethrough(false);
        } else {
            setEnableEdit(false);
            return props.actions.edit(k, true);
        }
    }

    function showUndoButton() {
        return (strikethrough || enableEdit) ? <span>(<span onClick={handleUndoClick} className='editableItem'>undo</span>)</span> : '';
    }

    function showRemoveButton() {
        return !enableEdit ? <span onClick={() => handleRemove(k)} className="remove">X</span> : <span style={{paddingLeft: '1.1em'}}></span>;
    }

    return (
        <li>
            {showRemoveButton()}
            <span onClick={() => handleEdit(k)} className={strikethrough ? 'strikethrough' : 'editableItem'}>
                {props.itemObj.item}
            </span>&nbsp;
            {showUndoButton()}
        </li>
    )
}

export default ListItem;