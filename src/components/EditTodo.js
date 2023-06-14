import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase.config';

const EditTodo = ({ todo: props_todo, id }) => {
    const [todo, setTodo] = useState(props_todo)

    const updateTodo = async () => {
        try {
            const todoDocument = doc(db, "todo", id);
            console.log("todoDocument", todoDocument)
            await updateDoc(todoDocument, {
                todo: todo
            });
            onSnapshot(setTodo);
            // window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        setTodo(props_todo)
    }, [props_todo])

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={`#id${id}`}      >
                Edit Todo
            </button>

            <div
                className="modal fade"
                id={`id${id}`}
                tabIndex="-1"
                aria-labelledby="editLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <form className="d-flex">

                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editLabel">Update Todo Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    
                                    value={todo}
                                    onChange={e => setTodo(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={updateTodo}
                                >Update Todo</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default EditTodo;