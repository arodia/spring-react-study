import './App.css';
import React, {useState} from "react";

function List(props) {
    const [updateVal, setUpdateVal] = useState('');
    return (
        <article className="todo-item">
            <a href="/read" onClick={event=>{
                event.preventDefault();
                props.readItem(props.val);
            }}>{props.val}</a>
            <button onClick={()=>props.deleteItem(props.id)}>삭제</button>
            <input type="text" value={updateVal} onChange={event=>{
                setUpdateVal(event.target.value);
            }}/>
            <button onClick={()=>props.updateItem(props.id, updateVal)}>수정</button>
        </article>
    )
}
function App() {
    const [inputVal, setInputVal] = useState('');
    const [toDoList, setToDoList] = useState([]);
    const [nextId, setNextId] = useState(0);
    const [read, setRead] = useState('');
    const addItem = ()=>{
        setToDoList([...toDoList, {id:nextId, val:inputVal}]);
        setNextId(nextId+1);
    };
    const deleteItem = id=>{
        setToDoList(toDoList.filter(list=>list.id !== id));
    };
    const updateItem = (id, val)=>{
        setToDoList(toDoList.map(list=>list.id===id?{...list, val:val}:list));
    };
    const readItem = val=>{
        setRead(val);
    };
    return (
        <div>
            <input type="text" value={inputVal} onChange={event=>{
                setInputVal(event.target.value);
            }}/>
            <button onClick={addItem}>추가</button>
            <p>TO DO LIST</p>
            {toDoList.map(list=><List readItem={readItem} updateItem={updateItem} deleteItem={deleteItem} key={list.id} id={list.id} val={list.val}/>)}
            <p>오늘 한일 : {read}</p>
        </div>
    )
}

export default App;
