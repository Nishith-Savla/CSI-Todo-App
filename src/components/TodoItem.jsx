import "./TodoItem.css";

import { useState } from "react";
import { Checkbox, IconButton, TextField } from "@material-ui/core";
import { deleteDoc, doc, setDoc } from "firebase/firestore";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import db from "../firebase";

let timeout;
const TodoItem = ({ id, completed, text }) => {
	const [todo, setTodo] = useState(text);
	const handleComplete = async () =>
		await setDoc(doc(db, "todos", id), { completed: !completed, text });

	const handleTextChange = e => {
		const { value } = e.target;
		setTodo(value);
		clearTimeout(timeout);
		timeout = setTimeout(async () => {
			if (text !== value)
				await setDoc(doc(db, "todos", id), { completed, text: value });
		}, 800);
	};
	const handleDelete = async e => await deleteDoc(doc(db, "todos", id));

	return (
		<div className="root">
			<Checkbox
				name="isCompleted"
				checked={completed}
				color="primary"
				onClick={handleComplete}
			/>
			<div className={`content ${completed && "striked"}`}>
				<TextField
					InputProps={{ disableUnderline: true }}
					name="todo"
					multiline
					style={{ width: "100%" }}
					value={todo}
					onChange={handleTextChange}
				/>
			</div>
			<IconButton onClick={handleDelete}>
				<DeleteOutlineIcon />
			</IconButton>
		</div>
	);
};

export default TodoItem;
