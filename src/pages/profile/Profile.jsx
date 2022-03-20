import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";

import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { PhotoCamera } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const [file, setFile] = useState(null);
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { user: currUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  const handleChange = async (e) => {
    setFile(e.target.files[0]);
    const updateUser = {
      userId: user._id,
    };
    const data = new FormData();
    const fileName = Date.now() + e.target.files[0].name;
    data.append("name", fileName);
    data.append("file", e.target.files[0]);
    updateUser.profilePicture = fileName;
    try {
      const uploadImg = await axios.post("/upload", data);
      const updatingUser = await axios.put(`/users/${user._id}`, updateUser);
      if (uploadImg.status === 200 && updatingUser.status === 200) {
        dispatch({ type: "UPDATE_USER", payload: fileName });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                className="profileCoverImg"
                alt=""
              />
              <div className="profilePictureContainer">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  className="profileUserImg"
                  alt=""
                />
                <label htmlFor="profilePicture">
                  <PhotoCamera />
                </label>
                <input
                  type="file"
                  accept=".png,.jpeg,.jpg"
                  id="profilePicture"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
