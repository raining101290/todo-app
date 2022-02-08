import React, { useEffect, useState } from "react";
import { array, func, object } from "prop-types";
import { v4 as uuid } from "uuid";
import moment from "moment";
import Snackbar from "@material-ui/core/Snackbar";

export default function AddItem(props) {
    const {
        todoList,
        setTodoList,
        editItem,
        setEditItem,
        snackBar,
        setSnackBar,
        handleClose,
        emptySnackBar,
    } = props;
    const [task, setTask] = useState("");

    //Setting edit task item to task state
    useEffect(() => {
        setTask(
            Array.isArray(editItem) && editItem?.length > 0
                ? editItem[0].title
                : ""
        );
    }, [editItem]);

    //Create Task
    const CreateTask = () => {
        if (task !== "") {
            if (task.length > 200) {
                emptySnackBar();
                setSnackBar({
                    ...snackBar,
                    open: true,
                    statusType: 1,
                    message: "Task can't be more than 200 characters",
                });
            } else {
                setTodoList([
                    ...todoList,
                    {
                        id: uuid(),
                        title: task.trim(),
                        date: moment().format("LL LTS"),
                    },
                ]);
                emptySnackBar();
                setSnackBar({
                    ...snackBar,
                    open: true,
                    statusType: 0,
                    message: "Task successfully created",
                });
                setTask("");
                setEditItem(null);
            }
        } else {
            emptySnackBar();
            setSnackBar({
                ...snackBar,
                open: true,
                statusType: 1,
                message: "Please write something.",
            });
            setTask("");
            setEditItem(null);
        }
    };

    //Update task
    const UpdateTask = () => {
        setTodoList(
            todoList.map((item) => {
                if (item.id === editItem[0].id) {
                    return {
                        ...item,
                        title: task,
                        date: moment().format("LL LTS"),
                    };
                }
                setSnackBar({
                    ...snackBar,
                    open: false,
                    statusType: 0,
                    message: "",
                });
                setSnackBar({
                    ...snackBar,
                    open: true,
                    statusType: 0,
                    message: "Update successful",
                });
                return item;
            })
        );
        setTask("");
        setEditItem(null);
    };

    //Reset task and Edit when click on Cancel
    const resetEdit = () => {
        setTask("");
        setEditItem([]);
    };

    return (
        <div className="actionCont">
            <span>Create Todo</span>
            {snackBar.open && (
                <Snackbar
                    open={snackBar.open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    className={snackBar.statusType === 0 ? "success" : "error"}
                >
                    <p onClick={handleClose}>{snackBar.message}</p>
                </Snackbar>
            )}
            <textarea onChange={(e) => setTask(e.target.value)} value={task} />
            <div className="btncont">
                {Array.isArray(editItem) && editItem?.length > 0 && (
                    <button type="button" onClick={resetEdit}>
                        Cancel
                    </button>
                )}

                <button
                    type="button"
                    onClick={
                        Array.isArray(editItem) && editItem?.length > 0
                            ? UpdateTask
                            : CreateTask
                    }
                >
                    {`${
                        Array.isArray(editItem) && editItem?.length > 0
                            ? "Update Task"
                            : "Create Task"
                    }`}
                </button>
            </div>
        </div>
    );
}

AddItem.propTypes = {
    list: array,
    todolist: array,
    setTodoList: func,
    editItem: array,
    snackBar: object,
    setSnackBar: func,
    handleClose: func,
    emptySnackBar: func,
};
