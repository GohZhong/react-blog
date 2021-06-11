import './about.css'
import { Context } from '../../context/context'
import { useContext, useState } from 'react'

import axios from 'axios';

export default function About() {
    const { user, isFetching, dispatch } = useContext(Context);
    const [about, setabout] = useState(user.about);
    const [fb, setfb] = useState(user.contact?.fb);
    const [tw, settw] = useState(user.contact?.tw);
    const [insta, setinsta] = useState(user.contact?.insta);
    const [success, setsuccess] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"});
        try {
            const res = await axios.put(`/users/${user._id}`,{
                userId: user._id,
                about,
                contact: {
                    fb,
                    tw,
                    insta
                }
            })
            console.log(res.data)
            res && await dispatch({type:"UPDATE_SUCCESS", payload: res.data})
            setsuccess(true);
            setTimeout(()=>setsuccess(false),3000);
        } catch(err){
            await dispatch({type:"UPDATE_FAILURE"});
            console.log(err);
        }
    }

    const handleHide = (e)=>{
        e.target.classList.toggle("opaque")
        e.target.parentNode.lastChild.classList.toggle("aboutIconHidden")
    }

    return (
        <div className="about">
            <div className="aboutWrapper">
                <div className="aboutTitle">
                    <span className="aboutTitleUpdate">Update About Me</span>
                </div>
                <form className="aboutForm" onSubmit={handleSubmit}>
                    <label>About Me:</label>
                    <textarea name="text" rows="14" cols="10" wrap="soft" value={about} onChange={(e)=>{setabout(e.target.value)}}></textarea>
                    <label>Contact:</label>
                    <div className="aboutI">
                        <div className="aboutIc">
                            <i className="aboutIcon opaque fab fa-facebook-square" onClick={handleHide}>:
                            </i>
                            <input id="fb" type="text" className="aboutcontactinput aboutIconHidden" placeholder="Insert link" value={fb} onChange={(e)=>{setfb(e.target.value)}}/>
                        </div>
                        <div className="aboutIc">
                            <i className="aboutIcon opaque fab fa-twitter-square" onClick={handleHide}>:</i> 
                            <input id="tw" type="text" className="aboutcontactinput aboutIconHidden" placeholder="Insert link" value={tw} onChange={(e)=>{settw(e.target.value)}}/>
                        </div>
                        <div className="aboutIc">
                            <i className="aboutIcon opaque fab fa-instagram-square" onClick={handleHide}>:</i>  
                            <input id="insta" type="text" className="aboutcontactinput aboutIconHidden" placeholder="Insert link" value={insta} onChange={(e)=>{setinsta(e.target.value)}} onLoad={(e)=>{
                                !insta && e.target.classList.toggle("aboutIconHidden")
                            }}/>
                        </div>
                    </div>
                    <button className="aboutSubmitButton" type="submit" disabled={isFetching}>
                        Update
                    </button>
                    {success &&
                        <span className="success">About Me has been updated</span>
                    }
                </form>
            </div>
        </div>
    )
}
