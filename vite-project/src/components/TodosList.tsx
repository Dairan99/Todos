import { ChangeEvent, FormEvent, useState } from "react"

interface ITodo {
    id:number
    text:string
}

const TodosList = () => {
    const [text, setText] = useState("")
    const [todos, setTodos] = useState<ITodo[]>([])

    const handleForm = (event: FormEvent) => {
        event.preventDefault()

        if (text.trim() === "") {
            return
        }

        const newTodo: ITodo = {
            id: Date.now(),
            text:text
        }

        setTodos([...todos, newTodo ])

        setText("")
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
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
                        {todos.map((item) => (
                            <li className="todos__item">{item.text}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}