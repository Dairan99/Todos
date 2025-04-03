import { ChangeEvent, FormEvent, useState } from "react"
import Footer from "./Footer"

interface ITodo {
    id:number
    text:string
    completed:boolean
    isSelected:boolean
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
            completed:false,
            isSelected:false
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

    const handleLabelClick = (id: number) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, isSelected: !todo.isSelected } : todo
          )
        );
    }

    return (
        <div className="todos">
            <div className="container">
                <h1 className="todos__title">todos</h1>
                <div className="todos__wrapper">
                    <form className="todos__form" onSubmit={handleForm}>
                        <div className="todos__form-wrapper">
                            <input className="todos__input" value={text} placeholder="What needs to be done?" onChange={handleInput}></input>
                            <svg className="todos__icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 612 612" xmlSpace="preserve"><g><g id="_x31_0_34_"><g><path d="M604.501,134.782c-9.999-10.05-26.222-10.05-36.221,0L306.014,422.558L43.721,134.782 c-9.999-10.05-26.223-10.05-36.222,0s-9.999,26.35,0,36.399l279.103,306.241c5.331,5.357,12.422,7.652,19.386,7.296 c6.988,0.356,14.055-1.939,19.386-7.296l279.128-306.268C614.5,161.106,614.5,144.832,604.501,134.782z" fill="currentColor"></path></g></g></g></svg>
                        </div>
                    </form>
                    <ul className="todos__list">
                        {filterTodos.map((item) => (
                            <li className="todos__item" key={item.id}>
                                <label className="todos__checkbox-container" onClick={() => handleLabelClick(item.id)}>
                                <input className="todos__checkbox" type="checkbox" id={`todo-${item.id}`} checked={item.completed} onChange={() => {
                                    setTodos(todos.map((todo) => todo.id === item.id ? {...todo, completed: !todo.completed} : todo))
                                }}>
                                </input>
                                <span className='todos__custom-checkbox'>
                                <svg className={item.isSelected ? 'todos__icon-checkmark-active' : "todos__icon-checkmark"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M10.5,14.7928932 L17.1464466,8.14644661 C17.3417088,7.95118446 17.6582912,7.95118446 17.8535534,8.14644661 C18.0488155,8.34170876 18.0488155,8.65829124 17.8535534,8.85355339 L10.8535534,15.8535534 C10.6582912,16.0488155 10.3417088,16.0488155 10.1464466,15.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 C7.34170876,11.9511845 7.65829124,11.9511845 7.85355339,12.1464466 L10.5,14.7928932 Z"/>
                                </svg>
                                </span>
                                <span className={item.isSelected ? "todos__item-text-completed" : "todos__item-text"}>{item.text}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <Footer onFilterChange={handleFilterChange} activeLenght={activeLenght} clearActive={clearCompleted}/>
            </div>
        </div>
    )
}

export default TodosList