import "./TodoItem.css";

import { Checkbox, IconButton, TextField } from "@material-ui/core";
import { deleteDoc, doc, setDoc } from "firebase/firestore";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import db from "../firebase";

const TodoItem = ({ id, completed, text }) => {
	const handleComplete = async () =>
		await setDoc(doc(db, "todos", id), { completed: !completed, text });

	const handleTextChange = async e =>
		await setDoc(doc(db, "todos", id), { completed, text: e.target.value });

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
					value={text}
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
