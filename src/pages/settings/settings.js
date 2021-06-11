import { useContext, useState } from 'react'
import { Context } from '../../context/context'
import axios from 'axios';
import SideBar from '../../components/sideBar/sideBar'

import './settings.css'

export default function Settings() {
    const { user, isFetching, dispatch } = useContext(Context);
    // const PF = "http://localhost:3001/images/";

    const [username, setusername] = useState(user.username);
    const [email, setemail] = useState(user.email);
    const [password, setpassword] = useState("");
    const [profilePicture] = useState(user.profilePicture);
    const [file, setfile] = useState(null);
    const [success, setsuccess] = useState(false);

    const [prevusername] = useState(user.username);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
            profilePicture
        }
        if (file){
            const filename = Date.now() + file.name;  //canot have two diff names
            const fileURL = "http://localhost:3001/images/"+filename;
            updatedUser.profilePicture= fileURL;
            const data = new FormData();
            data.append("name",filename);
            data.append("file",file);
            try{
                await axios.post('/upload',data);
            } catch(err){
                console.log(err);
            }
        }
        try {
            const res1 = await axios.put(`/users/${user._id}`, updatedUser);
            const res2 = await axios.put(`/posts/user/${prevusername}`, 
                {newusername: username}
            )
            if (res1 && res2){
                await dispatch({type:"UPDATE_SUCCESS", payload: res1.data});
                setpassword('');
                document.getElementById("password").value="";
                setsuccess(true);
                setTimeout(()=>setsuccess(false),3000);
            }
        } catch(err){
            await dispatch({type:"UPDATE_FAILURE"});
            console.log(err);
        }
    }

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsTitleUpdate">Update Your Account</span>
                    <span className="settingsTitleDelete">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                        src={file? URL.createObjectURL(file):
                            profilePicture?(profilePicture)
                            :(
                                "http://cdn.onlinewebfonts.com/svg/img_87237.png"
                            )
                        }
                        alt="profile"/>
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input
                        id="fileInput"
                        type="file"
                        style={{ display: "none" }}
                        className="settingsPPInput"
                        onChange={(e)=>{setfile(e.target.files[0])}}
                    />
                    </div>
                    <label>Username</label>
                    <input type="text" name="name" value={username} onChange={(e)=>{setusername(e.target.value)}}/>
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                    <label>Password</label>
                    <input id="password" type="password" placeholder="New password" name="password" onChange={(e)=>{setpassword(e.target.value)}} required/>
                    <button className="settingsSubmitButton" type="submit" disabled={isFetching}>
                        Update
                    </button>
                    {success &&
                        <span className="success">Profile has been updated</span>
                    }
                </form>
            </div>
            <SideBar/>
        </div>
    )
}
