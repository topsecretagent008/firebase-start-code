import React, { useState, useEffect } from 'react'
import EditTodo from './EditTodo';
import { collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../services/firebase.config';


const Todo = () => {
    const [createTodo, setCreateTodo] = useState("");
    const [todo, setTodo] = useState([]);
    const collectionRef = collection(db, 'todo');

    //Add Todo Handler
    const submitTodo = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collectionRef, {
                todo: createTodo,
                isChecked: false,
                timestamp: serverTimestamp()
            })
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    //Delete Handler
    const deleteTodo = async (id) => {
        try {
            window.confirm("Are you sure you want to delete this Todo?")
            const documentRef = doc(db, "todo", id);
            await deleteDoc(documentRef);
            await getTodo();
        } catch (err) {
            console.log(err);
        }
    }
    const getTodo = async () => {
        await getDocs(collectionRef).then((todo) => {
            let todoData = todo.docs.map((doc, index) => ({ ...doc.data(), id: doc.id }))
            setTodo(todoData);
        }).catch((err) => {
            console.log(err);
        })

    }

    useEffect(() => {
        getTodo();
    }, [])

    useEffect(() => {
        const q = query(collection(db, "todo"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                cities.push(doc.data().todo);
            });
            console.log("Current cities in CA: ", cities.join(", "));
        });
        
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-white">
                            <div className="card-body">
                                <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#addModal"
                                    type="button"
                                    className="btn btn-info">Add Todo
                                </button>

                                {todo.map((todo, id) =>
                                    <div className="todo-list" key={id}>
                                        <div className="todo-item">
                                            <hr />
                                            <span>
                                                <div className="checker" >
                                                    <span className="" >
                                                        <input
                                                            type="checkbox"
                                                        />
                                                    </span>
                                                </div>
                                                &nbsp;{JSON.stringify(todo.todo)}<br />
                                                <i>10/11/2022</i>
                                            </span>
                                            <span className=" float-end mx-3">
                                                <EditTodo todo={todo.todo} id={todo.id}/>
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => deleteTodo(todo.id)}
                                                className="btn btn-danger float-end">Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <div
                className="modal fade"
                id="addModal"
                tabIndex="-1"
                aria-labelledby="addModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <form className="d-flex" onSubmit={submitTodo}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="addModalLabel">
                                    Add Todo
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Add a Todo"
                                    onChange={(e) => setCreateTodo(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal">Close
                                </button>

                                <button className="btn btn-primary" >Create Todo</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
export default Todo;