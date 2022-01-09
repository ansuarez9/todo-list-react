import React from "react";
import EntryField from "./EntryField";
import { Item } from "./interfaces/Item";
import List from "./List";

interface ToDoState {
    list: Item[];
    input: Item;
    repeats: string[];
}

class ToDo extends React.Component<{}, ToDoState> {
    initialList: Item[] = [
        {item: 'Learn React', editing: false}, 
        {item: 'Practice Guitar', editing: false}, 
        {item: 'Sleep', editing: false}
    ];

    constructor(props: any){
        super(props);

        this.state = {
            list: this.initialList,
            input: {
                item: '',
                editing: false
            },
            repeats: []
        }
    }

    handleInput = (event: any) => {
        this.setState({
            input: {
                item: event.target.value,
                editing: this.state.input.editing
            }
        })
    }

    handleClick = () => {
        this.setState({
            repeats: []
        });
        // create an string array
        let newItems = this.state.input.item.split(',').map(item => item.trim());
        let list = this.state.list.slice();

        if(this.state.input.editing){
            const index = this.state.list.findIndex(i => i.editing === true);
            const editedItem = Object.assign({}, list[index], {item: newItems.shift(), editing: false});
            list[index] = editedItem;
        }

        // returns an object containing array of items already in to-do list, and new items array with the repeats removed
        const repeatedItems = this.checkRepeats(newItems);
        if(repeatedItems.repeats){
            newItems = repeatedItems.updatedNewItems;
        }
        const newItemObjects = newItems?.map(i => {
            return {
                item: i,
                editing: false
            }
        });

        list = [...list, ...newItemObjects];

        this.setState({
            list: list,
            input: {
                item: '',
                editing: false
            }
        });
    }

    checkRepeats = (newItems: string[]) => {
        const lcaseNewItems = newItems.map(i => i.toLowerCase());
        let repeats: string[] = [];
        const stateList = this.state.list.slice();

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

    handleRemove = (event: any) => {
        const index = +event.target.dataset.idx;
        const list = this.state.list.filter((itemObj: Item, idx: number) => {
            return idx !== index;
        });

        this.setState({
            list: list
        });
    }

    handleEdit = (event: any) => {
        const index = +event.target.dataset.idx;
        let list = this.state.list.slice();
        list = list.map((itemObj: Item, idx: number) => ({
                item: itemObj.item,
                editing: (index === idx) ? true : false
            })
        );

        this.setState({
            list: list,
            input: list[index]
        });
    }
    
    render() {
        let repeatedItems: any = this.state.repeats.slice();
        repeatedItems = repeatedItems.map((ri: string, idx: number) => (
            <span key={idx}><strong>{ri}</strong>{repeatedItems.length - 1 !== idx ? ', ' : '' } </span>)
        );

        return (
            <div>
                <header>Things To Do</header>
                {(repeatedItems.length > 0) ? <div>Item(s) {repeatedItems} are already on the list</div> : null}
                <List remove={this.handleRemove} edit={this.handleEdit} list={this.state.list} />
                <EntryField input={this.state.input} change={this.handleInput} click={this.handleClick} />
            </div>
        )
    }
}

export default ToDo;