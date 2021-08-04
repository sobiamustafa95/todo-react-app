import React, { useState } from "react";
import "../App.css";

const ToDoList = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [itemWillEdit, setItemWilEdit] = useState(null);

    const addItem = () => {
        if(!inputData) {
            alert("Please fill the data")
        } else if(inputData && !toggleSubmit) {
            setItems(
                items.map((element) => {
                    if(element.id === itemWillEdit){
                        return { ...element, name: inputData}
                    }
                    return element;
                })
            )
            
            setToggleSubmit(true);
            setInputData('');
            setItemWilEdit(null);

        } else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData}
            setItems([...items, allInputData]);
            setInputData('')
        }
    }

    // Delete items
    const deleteItem = (index) => {
        // console.log(id);
        const updateItems = items.filter((element) => {
            return index !== element.id;
        });
        setItems(updateItems);
    } 

    // Edit Items
    const editItem = (id) => {
        let newEditItem = items.find((element) => {
            return element.id === id;
        });

        console.log(newEditItem);

        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setItemWilEdit(id);
    }

    // Remove all
    const removeAll = () => {
        setItems([]);
    }

    // add data to local storage
    

    return (
    <>
        <div className = "main-div">
            <div className = "child-div">
                <h1>ToDo List</h1>
                <div className= "addItems">
                    <input type = "text" placeholder = "Add Items here..." value = {inputData} 
                    onChange = {(e) => setInputData(e.target.value)}
                    />
                    {
                        toggleSubmit ? <i className = "fa fa-plus add-btn" title = "Add Item" onClick = {addItem}></i> :
                        <i className = "fa fa-edit add-btn" title = "Update Item" onClick = {addItem}></i>
                    }

                </div>

                <div className = "showItems">
                    {
                        items.map((element) => {
                            return(
                                <div className = "eachItem" key = {element.id}>
                                    <h3> {element.name} </h3>

                                    <div className = "todo-btn">
                                        <i className = "far fa-edit add-btn" title = "Edit" onClick = {() => editItem(element.id)}></i>
                                        <i className = "far fa-trash-alt add-btn" title = "Delete" onClick = {() => deleteItem(element.id)}></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                
                {/* for clear all data */}
                <div className = "showItems">
                    <button className = "btn effect04" data-sm-link-text= "Remove All" onClick = {() => removeAll()}>
                        <span>Check List</span></button>
                </div>
            </div>
        </div>
    </>
  );
}

export default ToDoList;