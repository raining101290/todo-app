import { useEffect, useState } from "react";
import "./App.css";
import AddItem from "./components/AddItem";
import TodoList from "./components/TodoList";

function App() {
    const [todolist, setTodoList] = useState(
        localStorage.todoList ? JSON.parse(localStorage.todoList) : []
    );
    const [snackBar, setSnackBar] = useState({
        open: false,
        statusType: 0,
        message: "",
    });
    const emptySnackBar = () => {
        if (snackBar.open) {
            setSnackBar({
                ...snackBar,
                open: false,
            });
        }
    };
    const handleClose = (event, reason) => {
        setSnackBar({ ...snackBar, open: false });
    };
    const [editItem, setEditItem] = useState([]);
    const handleEditTodo = (id) => {
        setEditItem(todolist.filter((item) => item.id === id));
    };
    //Remove task from the list
    const handleRemove = (id) => {
        if (window.confirm("Are you sure you want to delete")) {
            setEditItem([]);
            setTodoList(todolist.filter((item) => item.id !== id));
            emptySnackBar();
            setSnackBar({
                ...snackBar,
                open: true,
                statusType: 0,
                message: "Item successfully removed",
            });
        }
    };

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todolist));
    }, [todolist]);

    return (
        <div className="App">
            <div className="container">
                <h3>TODO APP</h3>
                <TodoList
                    tasklist={todolist}
                    handleEditTodo={handleEditTodo}
                    handleRemove={handleRemove}
                />
                <AddItem
                    todoList={todolist}
                    setTodoList={setTodoList}
                    editItem={editItem}
                    setEditItem={setEditItem}
                    handleClose={handleClose}
                    snackBar={snackBar}
                    setSnackBar={setSnackBar}
                    emptySnackBar={emptySnackBar}
                />
            </div>
        </div>
    );
}

export default App;
