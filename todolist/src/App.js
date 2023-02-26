import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { randomColor} from 'randomcolor';
import Draggable from 'react-draggable';
import './App.css';

function App() {
const [item, setItem] = useState('');
const [items, setItems] = useState(
  JSON.parse(localStorage.getItem('items')) || []
);

useEffect(() => {
localStorage.setItem('items', JSON.stringify(items))
}, [items]) //dependencia -> si se cambia 'items' -> inicia useEffect

const newItem = () => {
  if(item.trim()!== ''){
    const newItem = {
      id: v4(),
      item: item,
      color: randomColor(),
      defaultPos: {
        x: 500,
        y: -500
      }
    }
    setItems((items) => [...items, newItem]);
    setItem('')
  } else {
    alert('Enter your task...')
    setItem('')
  }
}

const deleteNode = (id) => {
  setItems(items.filter((item)=> item.id !== id))
}

const updatePos = (data, index) => {
  let newArr = [...items];
  newArr[index].defaultPos = {x: data.x, y: data.y};
  setItems(newArr)
}

//activamos "enter" -> if press -> add element
const keyPress = (e) => {
  const code = e.keyCode || e.which;
  if(code ===13){
    newItem();
  }

}


  return (
    <div className='App'>
      <div className='wrapper'>
        <input 
        value={item} 
        type="text" 
        placeholder='Enter something'
        onChange={(e) => setItem(e.target.value)} 
        onKeyPress={(e) => keyPress(e)}/>
        <button className='enter' onClick={newItem}>To Do</button>
        </div> 

        {
          items.map((item, index)=> {
            return (
              <Draggable 
              key={index} 
              defaultPosition={item.defaultPos} 
              onStop={(_, data)=> {
                updatePos(data, index)
              }}>
                <div className='todo-item' style={{backgroundColor: item.color}}>
                  {`${item.item}`}
                  <button className='delete' onClick={()=> deleteNode(item.id)}>X</button>
                </div>

              </Draggable>
            )

          })
        }


    </div>
  );
}

export default App;
