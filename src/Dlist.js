// import './App.css';
import { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";

function Dlist() {

    const [task , setTask] = useState("");
    const [todo, setTodo] = useState([]);
    const [edit, setEdit] = useState(null);
    const [search, setSearch] = useState("");
    const [final, setFinal] = useState([]);

    const add = () => {
        if (edit !== null) {
            const updated = [...todo];
            updated[edit] = { task: task, checked: false };
            setTodo(updated);
            setFinal(updated);
            setEdit(null);
            setTask("");
        }
        else {
            setTodo([...todo, { task: task, checked: false }]);
            setFinal([...todo, { task: task, checked: false }]);
            setTask("");
        }
    }

    const del = (index) => {
        console.log("index = " + index)
        let d = todo.filter((val, id) => {
            console.log("id =", id)
            return id !== index;
        })
        setTodo(d);
        setFinal(d);
    }

    const update = (index) => {
        setEdit(index);
        setTask(todo[index].task);
    };

    const handlecheck = (index) => {
        const check = [...todo];
        check[index].checked = !check[index].checked;
        setTodo(check);
    }

    const searchhanlder = () => {
        let info = todo.filter((val, id) => {
            return val.task === search;
        })
        setTodo(info);
    }

    const completed = () => {
        let com = final.filter((val, id) => {
            return val.checked === true
        });
        setTodo(com);
        // setFinal(com);
    }

    const uncompleted = () => {
        let uncom = final.filter((val, id) => {
            return val.checked === false
        });
        setTodo(uncom);
        // setFinal(uncom);
    }

    const all = () => {
        var data = [...final];
        setTodo(data);
    }

    return (
        <div className="App">
            <div className="wrapper text-center">
                <h1>Todo List</h1>
                <Row>
                    <Col>
                        <input type="text" className='input' value={task} placeholder='Enter Task' onChange={(e) => { setTask(e.target.value) }} />
                        <input type='button' value={"Add Task"} onClick={() => { add() }} /><br />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input type='text' className='input' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <input type='button' value={"Search"} onClick={() => { searchhanlder() }} /><br />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input type='button' value={"Completed"} onClick={() => { completed() }} />
                        <input type='button' value={"UnCompleted"} onClick={() => { uncompleted() }} />
                        <input type='button' value={"All"} onClick={() => { all() }} />
                    </Col>
                </Row>
                <div className='form'>

                </div>

                <ul className='' style={{ marginTop: "10px", }}>
                    {
                        todo.map((ele, index) => {
                            return (
                                <li className='todo' key={index}>
                                    <input type='checkbox' onChange={() => handlecheck(index)} />
                                    <span style={{ textDecoration: ele.checked ? "line-through" : "" }}>{ele.task}</span>
                                        <input type='button' value={"Del"} className='del' onClick={() => { del(index) }} />
                                    <input type='button' value={"Edit"} onClick={() => { update(index) }} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}
export default Dlist;