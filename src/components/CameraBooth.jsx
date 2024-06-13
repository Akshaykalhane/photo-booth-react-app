import React, { useRef, useState,useEffect } from 'react'
import '../App.css';
import Webcam from 'react-webcam';
import Button from './Button';

function CameraBooth() {
    const imageRef=useRef(null)
    const [captureImage,setCaptureImage]=useState(null);
    const [success,setSuccess]=useState(false);
    const [message,setMessage]=useState('')

    const handleCapture=()=>{
        const imageSrc = imageRef.current.getScreenshot();
        setCaptureImage(imageSrc);
        setSuccess(true);
        setMessage('Image Captured')
    }
    useEffect(()=>{
        setTimeout(()=>{
            setSuccess(false)
            setMessage('')
        },4000)
    },[success])
    const handleDownload=()=>{
        if(captureImage){
            const image = document.createElement('a')
            image.href=captureImage;
            image.download='image.jpeg';
            document.body.appendChild(image)
            image.click();
            document.body.removeChild(image)
            setSuccess(true)
            setMessage('Image Downloaded')
        }
    }

    useEffect(() => {
        const checkBrowserWebCamera = () => {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            // setError(true);
          }
        }
        checkBrowserWebCamera();
      }, [])

  return (
    <>
        <div className="control-buttons">
            
            <div className="button">
                <button onClick={handleCapture}>Capture</button>
                <div className="divider"></div>
            </div>
            <div className="button">
                <button disabled={captureImage ? false : true} onClick={()=>setCaptureImage(null)}>retake</button>
                <div className="divider"> </div>
            </div>
            <div className="button">
                <button disabled={captureImage ? false : true} onClick={()=>handleDownload()}>download</button>
                <div className="divider"> </div>
            </div>
            <div className="button">
                <button>post</button>
                <div className=" divider "></div>
            </div>
            {success && 
            <div className='show-notification'> 
            <p>{message}</p>
            <img src='./images/success.png' className='success-img' />
             </div>}
        </div>
        <div className="image-frame">
            <div className="web-cam-container">
            <div className="web-cam-outer">
            {/* <Webcam
                audio={false}
                mirrored={false}
                ref={imageRef}
                screenshotFormat='image/jpeg'
                className='webcam' /> */}
                {captureImage ? <img src={captureImage} /> : <Webcam
                audio={false}
                mirrored={false}
                ref={imageRef}
                screenshotFormat='image/jpeg'
                className='webcam' /> }
                </div>
            <img src="./images/frame.png" className='overlay-img' alt="" />
            </div>
        </div>
        <div className="side-img">
            <img src="./images/right-img.png" alt="" />
        </div>
    </>
  )
}

export default CameraBooth;