import React from 'react';
import { useState } from 'react';


const ProfilePicture = () => {

const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className="App">
            <h1>Add Image:</h1>
            <input type="file" onChange={handleChange} />
            <img src={file} />
        </div>
    );
//    const[file, setFile] = useState()
//
//    function handleFile(event) {
//        setFile(event.target.files[0])
//        console.log(event.target.files[0])
//    }
//    function handleUpload() {
//        const formData = new FormData()
//        formData.append('file', file)
//        fetch(
//            'url',
//            {
//                method: "POST",
//                body: formData
//
//            }
//        ).then((response) => response.json()).then(
//            (result) => {
//                console.log('success', result)
//            }
//        )
//        .catch(error => {
//            console.error("Error:", error)
//        })
//    }
//    return (
//    <div className="App">
//    <form onSubmit={handleUpload}>
//        <input type="file" name="file" onChange={handleFile}/>
//        <button onClick={handleUpload}>Upload</button>
//    </form>
//    </div>
//
//    );

}

export default ProfilePicture;