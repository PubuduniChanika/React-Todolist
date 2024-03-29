
import { useState, useEffect } from "react";

function generatedId(){
    return Math.floor(Math.random()*10)
}

function Todo() {
    const[todos,setTodos] = useState([])
    const[input,setInput] = useState("")

    useEffect(() => {
        // Retrieve todos from local storage when the component mounts
        const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        setTodos(storedTodos);
      }, []);
    
      useEffect(() => {
        // Save todos to local storage whenever todos change
        localStorage.setItem("todos", JSON.stringify(todos));
      }, [todos]);

    const handleSubmit=()=>{
        setTodos((todos) =>
            todos.concat({
                text:input,
                id:generatedId()
            })
        )
            setInput("")
    }

    const removeTodo = (id) => setTodos((todos) => todos.filter((t) => t.id !== id));
      
      
    
  return (
    <>
    <div className = "container">
        <input type="text" 
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        placeholder="New To-do" />

        <button onClick={handleSubmit}>Submit</button>
        <ul className="todos-list">
            {
            todos.map(({text,id})=>
                <li key={id} className="todo">
                    <span>{text}</span>
                    <button className="close" onClick={()=>removeTodo(id)}>X</button>
                </li>
            )}
        </ul>

    </div>
    </>
  )
}

export default Todo