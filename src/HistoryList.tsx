import { useState } from "react";
import { Item } from "./interfaces/Item";

interface historyListProps {
    historyList: {list: Item[]}[],
    applyHistory: (selectedIdx: number) => void
}

function HistoryList(props: historyListProps) {
    const initialArray: Item[] = [];
    const [previewList, setPreviewList] = useState(initialArray);
    const [selectedIdx, setSelectedIdx] = useState(0);

    function resetStates() {
        setPreviewList(initialArray);
        setSelectedIdx(0);
    }

    function handleApply() {
        props.applyHistory(selectedIdx);
        resetStates();
    }

    function handleClose() {
        resetStates();
    }

    function updatePreviewList(idx: number) {
        setSelectedIdx(idx);
        setPreviewList(props.historyList[idx].list);
    }
    
    const noHistory = (props.historyList.length === 1) 
        ? 'No time travel available at the moment, please update the list' 
        : `${props.historyList.length - 1} history state(s) to show`;

    const showPreviewList = () => {
        if(previewList.length > 0) {
            return (
                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <ul>
                            {previewList.map((listItem: Item) => {
                                return <li key={listItem.idx}>{listItem.item}</li>
                            })}
                            <div className="mt-3">
                            <button onClick={handleApply} className="btn btn-success">Apply</button>
                            <button onClick={handleClose} className="btn btn-danger" style={{marginLeft: '1em'}}>Close</button>
                            </div>
                        </ul>
                    </div>
                </div>
            );
        }
    }

    const timeTravelButtons = (idx: number) => {
        let buttonText = `${idx} lists back`;

        if(idx === 1){
            buttonText = 'Previous list';
        } else if (idx === (props.historyList.length - 1)) {
            buttonText = 'Back to Beginning';
        }

        return (
            <button className={selectedIdx === idx ? "btn btn-info active" : "btn btn-info"} onClick={() => updatePreviewList(idx)}>{buttonText}</button>
        );
    }
    
    return (
        <div className="mt-4">
            <div style={{paddingLeft: '.7em'}}><strong><em>{noHistory}</em></strong></div>
            <ul className="mt-3">
                {props.historyList.map((hl, idx) => {
                    if(idx !== 0){
                        return (
                            <span style={{marginRight: '1em', marginBottom: '.6em', display: 'inline-block'}} key={idx}>
                                {timeTravelButtons(idx)}
                            </span>
                        )
                    }
                })}
            </ul>
            {showPreviewList()}
        </div>
    );
}

export default HistoryList;