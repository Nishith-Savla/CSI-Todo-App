import "./Todos.css";

import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import TodoItem from "./TodoItem";
import db from "../firebase";

const Todos = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const todosCollection = collection(db, "todos");
		const unsubscribe = onSnapshot(
			todosCollection,
			querySnapshot => {
				const docs = [];
				querySnapshot.forEach(doc =>
					docs.push({ ...doc.data(), id: doc.id })
				);
				setTodos(docs);
			},
			error => console.error(error)
		);

		return unsubscribe;
	}, []);

	const addTodo = async () =>
		await addDoc(collection(db, "todos"), { completed: false, text: "" });

	return (
		<div className="todos">
			<ul>
				{todos.map(({ id, completed, text }) => (
					<li key={id}>
						<TodoItem id={id} completed={completed} text={text} />
					</li>
				))}
			</ul>
			<div className="add-button">
				<Fab onClick={addTodo} color="primary">
					<AddIcon />
				</Fab>
			</div>
		</div>
	);
};

export default Todos;
