import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../utils";
import FollowHandler from "./FollowHandler";




const UpdateProfil = () => {

	const [bio, setBio] = useState("");
	const [updateForm, setUpdateForm] = useState(false);
	const userData = useSelector((state) => state.userReducer);
	const usersData = useSelector((state) => state.usersReducer);
	const dispatch = useDispatch();
	const [followingPopup, setFollowingPopup] = useState(false);
	const [followersPopup, setFollowersPopup] = useState(false);

	const handleUpdate = () => {
		dispatch(updateBio(userData._id, bio));
		setUpdateForm(false);
	};

	return (
		<div className="profil-container">
			<LeftNav />
			<h1>Profil de {userData.pseudo}</h1> 
			<div className="update-container">
				<div className="left-part">
					<h3>Photo de profil</h3>  
					<img src={ userData.picture } alt="user-pict" />
					<UploadImg />
				</div>
				<div className="right-part">
					<div className="bio-update">
						<h3>Bio</h3>  
						{updateForm === false && (
							<>
									<p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
									<button onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
							</>
						)}
						{updateForm && (
							<>
								<textarea
									type="text"
									defaultValue={userData.bio}
									onChange={(e) => setBio(e.target.value)}>
								</textarea>
								<button onClick={handleUpdate}>Valider modifications</button>
							</>
						)}
					</div>
					<h4>Membre depuis le :  {dateParser(userData.createdAt) }</h4>
					<h5 onClick = { () => setFollowingPopup(true) } >Abonnements : { userData.following ? userData.following.length : ""} </h5>
					<h5 onClick = { () => setFollowersPopup(true) }>Abonnes : { userData.followers ? userData.followers.length : ""}</h5>
				</div>
			</div>
			{followersPopup && (
				<div className="popup-profil-container">
					<div className="modal">
						<h3>Mes Abonnes</h3>
						<span className="cross" onClick={() => setFollowersPopup(false)}>&#10005;</span>
						<ul>
						{ usersData.map((user) => {
								for (let i = 0; i < userData.followers.length; i++) {
									if (user._id === userData.followers[i]) {
										return (
											<li key={user._id}>
												<img src={user.picture} alt="user-pict" />
												<h4>{user.pseudo}</h4>
												<div className="follow-handler">
													<FollowHandler idToFollow={user._id} />
												</div>
											</li>
										);
									}
								}
								return null;
							})	
						}
						{/* </ul> */}
	
						<h3>Utilisateurs abonnes non trouves</h3>	
						{ userData.followers.map((id) => {
							let nonTrouve = true;
							for (let i = 0; i < usersData.length; i++) {
								if (id === usersData[i]._id) {
									nonTrouve = false;
									return null;
								}
							}
							if (nonTrouve) return (<li key={id}>{id} <h4></h4><h1>supp</h1></li>)
							else return null;
						})}
						</ul>
					</div>
				</div>
			)}

			{followingPopup && (
				<div className="popup-profil-container">
					<div className="modal">
						<h3>Mes Abonnements</h3>
						<span className="cross" onClick={() => setFollowingPopup(false)}>&#10005;</span>
						<ul>
							{ usersData.map((user) => {
								for (let i = 0; i < userData.following.length; i++) {
									if (user._id === userData.following[i]) {
										return (
											<li key={user._id}>
												<img src={user.picture} alt="user-pict" />
												<h4>{user.pseudo}</h4>
												<div className="follow-handler">
													<FollowHandler idToFollow={user._id} />
												</div>
											</li>
										);
									}
								}
								return null;
							})}
						{/* </ul> */}

						<h3>Utilisateurs suivis non trouves</h3>
						{ userData.following.map((id) => {
							let nonTrouve = true;
							for (let i = 0; i < usersData.length; i++) {
								if (id === usersData[i]._id) {
									nonTrouve = false;
									return null;
								}
							}
							if (nonTrouve) return (<li key={id}>{id} <h4></h4><h1>supp</h1></li>)
							else return null;
						})}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default UpdateProfil;