import React from "react";
import { array, func } from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default function TodoList(props) {
    const { tasklist, handleEditTodo, handleRemove } = props;

    return (
        <div className="listCont">
            {tasklist?.length > 0 ? (
                tasklist
                    .slice(0)
                    .reverse()
                    .map((item) => {
                        return (
                            <div className="listItem" key={item.id}>
                                <div className="info">
                                    <span>{item.title}</span>
                                    <span>{item.date}</span>
                                </div>
                                <EditIcon
                                    onClick={() => {
                                        handleEditTodo(item.id);
                                    }}
                                />
                                <DeleteIcon
                                    onClick={() => {
                                        handleRemove(item.id);
                                    }}
                                />
                            </div>
                        );
                    })
            ) : (
                <div className="listCont">
                    <div className="listItem">No Todo found</div>
                </div>
            )}
        </div>
    );
}

TodoList.propTypes = {
    tasklist: array,
    handleEditTodo: func,
    handleRemove: func,
};
