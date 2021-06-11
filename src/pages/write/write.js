import axios from 'axios';
import './write.css'
import { useContext, useState } from 'react';
import { Context } from '../../context/context';

export default function Write() {
    const [title, settitle] = useState('');
    const [desc, setdesc] = useState('');
    const [file, setfile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const newPost = {
            username: user.username,
            title: title,
            desc: desc
        }
        if (file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            newPost.photo = filename;
            try{
                await axios.post('/upload',data)
            } catch(err){
                console.log(err);
            }
        }
        console.log(newPost)
        try {
            const res = await axios.post("/posts",newPost);
            console.log(res.data)
            res && window.location.replace("/post/"+ res.data._id)
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className="write">
            {file && 
                <img className="writeImg" 
                src={URL.createObjectURL(file)}  //what does this do?
                alt="inputImage" />
            }
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileinput">
                        <i className="writeIcon fas fa-folder-plus"></i>
                    </label>
                    <input type="file" name="fileinput" id="fileinput" style={{display: 'none'}} onChange={(e)=>setfile(e.target.files[0])}/>
                    <input className="writeInput"type="text" placeholder="Title" autoFocus={true} onChange={(e)=>{settitle(e.target.value)}}/>
                </div>
                <div className="writeFormGroup">
                    <textarea className="writeInput writeText" type="text" cols="30" rows="10" placeholder="Write your story" onChange={(e)=>{setdesc(e.target.value)}}></textarea>
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}
