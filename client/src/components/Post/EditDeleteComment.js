import React, { useState, useEffect, useContext  } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../actions/post.actions';
import { UidContext } from "../AppContext";

const EditDeleteComment = ({comment, postId}) => {
	const [isAuthor, setIsAuthor] = useState(false);
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState("");
	const uId = useContext(UidContext);
	const dispatch = useDispatch();

	const handleEdit = (e) => {
	// evite le changement page a l'envoie du formulaire{
		e.preventDefault();

		if (text) {
			dispatch(editComment(postId, comment._id, text));
			setText("");
			setEdit(false);
		}
	};
	

	const handleDelete = () => dispatch(deleteComment(postId, comment._id));

	useEffect(() => {
		const checkAuthor = () => {
			if (uId === comment.commenterId) {
				setIsAuthor(true);
			}
		};
		checkAuthor();
	}, [uId, comment.commenterId]);



	return (
		<div className="edit-comment">
			{isAuthor && edit === false && (
				<span onClick={() => setEdit(!edit)}>
					<img src="./img/icons/edit.svg" alt="edit-comment" />
				</span>
			)}
			{isAuthor && edit && (
				<form action="" onSubmit={handleEdit}
					className="edit-comment-form">
					<label htmlFor="text" onClick={() => setEdit(!edit)}>
						Editer
					</label>
					<br />
					<input
						autoComplete="off"
						type="text"
						name="text"
						onChange={(e) => setText(e.target.value)}
						defaultValue={comment.text}
					/>
					<br />
					<div className="btn">
						<span onClick={() => {
							if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
								handleDelete();
							}
						}}>
							<img src="./img/icons/trash.svg" alt="delete" />
						</span>
						<input type="submit" value="Valider modificaion" />
					</div>
				</form>
			)}	
		</div>
	);
};

export default EditDeleteComment;