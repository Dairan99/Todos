import { ChangeEvent, FormEvent, useState } from "react"
import Footer from "./Footer"

interface ITodo {
    id:number
    text:string
    completed:boolean
}

const TodosList = () => {
    const [text, setText] = useState("")
    const [todos, setTodos] = useState<ITodo[]>([])
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

    const handleForm = (event: FormEvent) => {
        event.preventDefault()

        if (text.trim() === "") {
            return
        }

        const newTodo: ITodo = {
            id: Date.now(),
            text:text,
            completed:false
        }

        setTodos([...todos, newTodo ])
        setText("")
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const handleFilterChange  = (newFilter: "all" | "active" | "completed") => {
        setFilter(newFilter)
    }

    const filterTodos = todos.filter((todo) => {
        switch (filter) {
            case "active":
                return !todo.completed;
            case "completed":
                return todo.completed 
            case "all":
                default:
                return true
        }
    })

    const activeLenght = todos.filter((todo) => !todo.completed).length

    const clearCompleted  = () => {
        setTodos(todos.filter((todo) => !todo.completed))
    }

    return (
        <div className="todos">
            <div className="container">
                <h1 className="todos__title">todos</h1>
                <div className="todos__wrapper">
                    <form className="todos__form" onSubmit={handleForm}>
                        <input className="todos__input" value={text} onChange={handleInput}></input>
                    </form>
                    <ul className="todos__list">
                        {filterTodos.map((item) => (
                            <li className="todos__item" key={item.id}>
                                <input className="todos__checkbox" type="checkbox" checked={item.completed} onChange={() => {
                                    setTodos(todos.map((todo) => todo.id === item.id ? {...todo, completed: !todo.completed} : todo))
                                }}></input>
                                {item.text}</li>
                        ))}
                    </ul>
                </div>
                <Footer onFilterChange={handleFilterChange} activeLenght={activeLenght} clearActive={clearCompleted}/>
            </div>
        </div>
    )
}

export default TodosList