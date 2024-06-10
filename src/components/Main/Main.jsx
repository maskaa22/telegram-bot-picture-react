// import Button from "../Button/Button";
// import { useTelegram } from "../../hooks/useTelegram";
// import './Main.css';
// import { useCallback, useEffect, useState } from "react";

// const Main = () => {

//   const [image, setImage] = useState(null);

//   const { onToogleButton, tg } = useTelegram();

//   // const handleFileChange = (e) => {
//   //   console.log(e.target.value)
//   //   setImage(e.target.value);
//   // }

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setImage(reader.result);
//     };

//     if(file) {
//       reader.readAsDataURL(file);
//     }
//   }

//   const onSendData = useCallback(()=> {
//     const data = {image};
//     tg.sendData(JSON.stringify(data))
//   }, [image, tg])

//   useEffect(() => {
//     tg.onEvent('mainButtonClicked', onSendData)
//     return () => {tg.offEvent('mainButtonClicked', onSendData)}
//   }, [onSendData, tg])




//   return (
//     <div className="main">

//     {/* <input type="file" placeholder="Завантажити фото" onChange={(e) => handleFileChange(e)}/> */}

//       {/* <img alt="for chat II" src="" className="img"/> */}

//       <input type="file" accept="image/*" onChange={handleImageChange}/>
//       {image && <img src={image} alt="uploaded" className="img"/>}


//        {/* <div><textarea cols={11} rows={5} className="textarea" /></div> */}

//       <div><Button onClick={onToogleButton}>Що зображено на малюнку?</Button></div> 

//     </div>
//   )
// };

// export default Main;

import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useTelegram } from "../../hooks/useTelegram";

const Main = () => {

  const { tg } = useTelegram();


  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [upLabel, setUpLabel] = useState('');


  // const fileToBase64 = (file) => {
  //   return new Promise((res, req) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       res(reader.result.split(',')[1]);
  //       reader.onerror = (err) => { req(err); }
  //     }
  //   })
  // }

//const [base64Image, setBase64Image] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(e.target.files[0])

    try {
      setSelectedImage(URL.createObjectURL(file));
      tg.MainButton.show();
      
      // const reader = new FileReader();
      // reader.addEventListener('load', () => {
      //   setBase64Image(reader.result);
      // })
      // reader.readAsDataURL(file);
    } catch (err) {
      console.log(err);
    } 
  }

  console.log(file)
  

  // const handleUpload = async (e) => {
  //   const formData = new FormData();
  //   formData.append('image', selectedImage);

  //   try {
  //     const response = await axios.post('http://localhost:5000/upload', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' }
  //     });

  //     setImagePath(response.data.imagePath);
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };

  // const mainButtonClicked = async () => {

  //   tg.MainButton.show();

  //   // if (imagePath) {
  //   //   // Здесь можно выполнить дополнительные действия с загруженным изображением перед отправкой, если необходимо
  //   //   console.log('Sending image to chat bot:', imagePath);
  //   // } else {
  //   //   console.log('No image uploaded');
  //   //}
  // };



 


  const onSendData = useCallback(async() => {
    //const data = { base64Image };
    //tg.sendData(JSON.stringify(data));
    //e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    try {

      // axios( 
      // {
      //   method: 'POST',
      //   url: 'https://telegram-bot-picture-node.onrender.com/upload-image',
      //   headers: {
      //       'Content-Type': 'multipart/form-data',
      //   },
      //   data: formData
      //  })

    

       const result = await axios.post('http://localhost:5000/upload-image', formData, {
             headers: {
                 'Content-Type': 'multipart/form-data',
             },
         })
         console.log('OJKKKK')
         if(result) {
          setUpLabel(result.data)
         }

    } catch(err) {
      console.log(err)
    }

    // fetch('http://localhost:5000/', {
    //          method: 'POST',
    //          headers: {
    //              'Content-Type': 'application/json',
    //          },
    //          body: JSON.stringify(data)
    //      })

    // const handleUpload = async () => {
    //   const formData = new FormData();
    //   formData.append('image', image);
    //   try {

    //     const response = await axios.post('http://localhost:5000/', formData, {
    //       headers: {'Content-Type': 'multipart/form-data'}
    //     });
    //     console.log(response.data);
    //   }
    //   catch (err) {
    //     console.log(err);
    //   }
    // }
    // handleUpload();

  }, [file])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => { tg.offEvent('mainButtonClicked', onSendData) }
  }, [onSendData, tg])

  return (
    <div className='input-container'>
      <input
        id="image-input"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {selectedImage && <img src={selectedImage} alt='selected' />}
      <label>{upLabel}</label>
      {/* {imagePath && <img src={imagePath} alt="Uploaded" />} */}
      {/* <button onClick={mainButtonClicked}>Отправить на чат</button> */}
    </div>
  );
};

export default Main;