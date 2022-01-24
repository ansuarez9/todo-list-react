import React from "react";
import EntryField from "./EntryField";
import HistoryList from "./HistoryList";
import { Item } from "./interfaces/Item";
import { ToDoState } from "./interfaces/ToDoState";
import List from "./List";

class ToDo extends React.Component<{}, ToDoState> {
    initialList: { list: Item[] }[] = [
        {
            list: [
                {idx: (Math.floor(Math.random() * 1000)), item: 'Learn React'}, 
                {idx: (Math.floor(Math.random() * 1000)),item: 'Practice Guitar'}, 
                {idx: (Math.floor(Math.random() * 1000)),item: 'Sleep'}
            ]
        }
    ];

    constructor(props: any){
        super(props);

        this.state = {
            historyList: this.initialList,
            input: {
                idx: null,
                item: ''
            },
            repeats: []
        }
    }

    handleInput = (event: any) => {
        this.setState({
            input: {
                idx: this.state.input.idx,
                item: event.target.value
            }
        })
    }

    handleAddItem = (updatedItem: Item) => {
        this.setState({
            repeats: []
        });
        // create an string array
        let newItems = this.state.input.item.split(',').map(item => item.trim());
        const historyList = this.state.historyList.slice();
        const currentList = historyList[0].list.slice();

        if(updatedItem.idx) {
            const index = currentList.findIndex((i) => i.idx === updatedItem.idx);
            const editedItem = Object.assign({}, currentList[index], {item: newItems.shift()});
            currentList[index] = editedItem;
        }

        // returns an object containing array of items already in to-do list, and new items array with the repeats removed
        const repeatedItems = this.checkRepeats(newItems);
        if(repeatedItems.repeats){
            newItems = repeatedItems.updatedNewItems;
        }
        const newItemObjects = newItems?.map(i => {
            return {
                idx: (Math.floor(Math.random() * 1000)),
                item: i.trim().replace(/^\w/, (c) => c.toUpperCase())
            }
        });

        const updatedList = [...currentList, ...newItemObjects];
        const updatedHistoryList = [{list: updatedList}, ...historyList];

        this.setState({
            historyList: updatedHistoryList,
            input: {
                idx: null,
                item: ''
            }
        });
    }

    checkRepeats = (newItems: string[]) => {
        const lcaseNewItems = newItems.map(i => i.toLowerCase());
        let repeats: string[] = [];
        const stateList = this.state.historyList[0].list.slice();

        stateList.forEach((i) => {
            if(lcaseNewItems.includes(i.item.toLowerCase())){
                repeats = [...repeats, i.item];
            }
        });

        const lCaseRepeats = repeats.map(r => r.toLowerCase());
        const newList = lcaseNewItems.filter(item => !lCaseRepeats.includes(item.toLowerCase()));

        this.setState({
            repeats: repeats
        });
        return { repeats: (repeats.length > 0), updatedNewItems: newList };
    }

    handleRemove = (key: number) => {
        const historyList = this.state.historyList.slice();
        const currentList = historyList[0].list.slice();
        const updatedList = currentList.filter((itemObj: Item) => {
            return itemObj.idx !== key;
        });
        const updatedHistoryList = [{list: updatedList}, ...historyList];

        this.setState({
            historyList: updatedHistoryList
        });
    }

    handleEdit = (key: number, undo?: boolean) => {
        if(undo){
            this.setState({
                input: {
                    idx: null,
                    item: ''
                }
            });
            return;
        }
        
        const historyList = this.state.historyList.slice();
        const currentList = historyList[0].list.slice();

        const itemToEdit = Object.assign({}, currentList.find(item => item.idx === key));

        this.setState({
            input: itemToEdit
        });
    }

    handleApplyHistory(selectedHistoryIdx: number) {
        const updatedHistoryList = this.state.historyList.slice(selectedHistoryIdx);
        this.setState({
            historyList: updatedHistoryList
        });
    }
    
    render() {
        let repeatedItems: any = this.state.repeats.slice();
        repeatedItems = repeatedItems.map((ri: string, idx: number) => (
            <span key={idx}><strong>{ri}</strong>{repeatedItems.length - 1 !== idx ? ', ' : '' } </span>)
        );

        return (
            <div>
                <h3>To-Do React Edition</h3>
                <div className="card">
                    {(repeatedItems.length > 0) ? <div className="text-danger">Item(s) {repeatedItems} are already on the list</div> : null}
                    <div className="card-body">
                        <h5 className="card-title">{this.state.historyList[0].list.length} Items</h5>
                        <p className="card-text text-dark">You can <strong>add</strong>, <strong>edit</strong>, <strong>mark as done</strong>, or <strong>delete</strong> an item. If you'd like to go to a previous list state, use the time travel at the bottom.</p>
                        <List remove={this.handleRemove} edit={this.handleEdit} currentList={this.state.historyList[0].list} />
                    </div>
                </div>
                <div>
                    <EntryField input={this.state.input} change={this.handleInput} addItem={this.handleAddItem} />
                    <HistoryList applyHistory={(idx) => this.handleApplyHistory(idx)} historyList={this.state.historyList} />
                </div>
            </div>
           
        )
    }
}

export default ToDo;