import React, { useState } from 'react';
import axios from 'axios';

function ProfilePicture() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle the response, e.g., save the image URL
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {previewUrl && <img src={previewUrl} alt="Preview" />}
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}



//const [file, setFile] = useState();
//    function handleChange(e) {
//        console.log(e.target.files);
//        setFile(URL.createObjectURL(e.target.files[0]));
//    }
//
//    return (
//        <div className="App">
//            <h1>Add Image:</h1>
//            <input type="file" onChange={handleChange} />
//            <img src={file} />
//        </div>
//    );
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



export default ProfilePicture;