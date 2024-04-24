import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

export default function ProfilePicture() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const { user, isAuthenticated, isLoading } = useAuth0();
   const [profileURL, setProfileURL] = useState(null);

useEffect(() => {
  displayPicture();
},[])

async function displayPicture() {
  try {
        const response = await axios.get('files/' + user.email);
        const binaryData = [];
        binaryData.push(response.data);
        console.log(binaryData);
        const imgBlob = new Blob(binaryData, {type: 'img/png'})
        const imgURL = URL.createObjectURL(imgBlob);
        setProfileURL(imgURL);
        console.log(imgURL);
      } catch (error) {
        console.error('Error displaying the image:', error);
      }

};
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };


  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/upload/' + user.email, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle the response, e.g., save the image URL
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
}
return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {previewUrl && <img src={previewUrl} width='400' alt="Preview" />}
      <button onClick={handleUpload}>Upload Image</button>
      <img src={profileURL} width='400'></img>
    </div>
  );
 };





