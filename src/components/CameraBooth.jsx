import React, { useRef, useState, useEffect } from 'react'
import '../App.css';
import Webcam from 'react-webcam';
import Button from './Button';
import Notification from './Notification';
import html2canvas from 'html2canvas';
import drawImage from './handleCapture';

function CameraBooth() {
    const imageRef = useRef(null)
    const canvasRef=useRef(null)
    const [captureImage, setCaptureImage] = useState(null);
    const [currentImage,setCurrentImage]=useState(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('')

    const handleCapture = () => {
        const currentImg = imageRef.current.getScreenshot();
        setCurrentImage(currentImg);
        console.log(currentImg)
        setCaptureImage(currentImg);
        // setCaptureImage(imageSrc);

        // setSuccess(true);
        // setMessage('Image Captured')
        // const webcamWindow = imageRef.current.video;
        // const canvas = canvasRef.current;
        // const context = canvas.getContext('2d');

        // canvas.width=webcamWindow.videoWidth-60;
        // canvas.height=webcamWindow.videoWidth;
        // console.log(canvas.width,canvas.height);
        // //draw image
        // context.drawImage(webcamWindow,0,0,canvas.width,canvas.height)
        // //canvas working
        // const frameImage = new Image();
        // frameImage.src='./images/frame.png';
        
        // frameImage.onload=()=>{
        //     context.drawImage(frameImage,0,0,canvas.width,canvas.height)
        //     const imageSrc= canvas.toDataURL('image/png');
            
        //     console.log('image capture')
        //     setCaptureImage(imageSrc)
        // }
    }
    useEffect(() => {
        setTimeout(() => {
            setSuccess(false)
            setMessage('')
        }, 4000)
        console.log(canvasRef.current)
    }, [success])

    

    const handleDownload =  () => {

        // const canvasDraw=async()=>{
        //     // setCaptureImage(imageSrc)
        // }
        console.log('caprure')
        if(captureImage){
            console.log('click download')
            drawImage(canvasRef)
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

    const handleRetake = () => {
        setCaptureImage(null)
        setCurrentImage(null);
    }

    return (
        <>
            <div className="control-buttons">
                <Button title="capture" action={handleCapture}  />
                {/* <div className="button">
                <button onClick={handleCapture}>Capture</button>
                <div className="divider"></div>
            </div> */}
                <Button title="retake" action={handleRetake}  />
                {/* <div className="button">
                <button disabled={captureImage ? false : true} onClick={()=>setCaptureImage(null)}>retake</button>
                <div className="divider"> </div>
            </div> */}
                <Button title="download" action={handleDownload}  />
                {/* <div className="button">
                <button disabled={captureImage ? false : true} onClick={()=>handleDownload()}>download</button>
                <div className="divider"> </div>
            </div> */}
                <div className="button">
                    <button>post</button>
                    <div className=" divider "></div>
                </div>
                {/* {success && <Notification message={message} />} */}
            </div>
            <div className="image-frame">
                    <div className="home-button">
                <button> <i class="fa fa-home"></i> home</button>
                </div>
                <div className="web-cam-container" ref={canvasRef}>
                    <div className="web-cam-outer">
                        {/* {currentImage ? <img src={currentImage} className='webcam' /> : <Webcam
                            audio={false}
                            mirrored={false}
                            ref={imageRef}
                            forceScreenshotSourceSize={true}
                            screenshotFormat='image/png'
                            screenshotQuality={3}
                            className='webcam' />} */}
                            
                            
                            <Webcam
                            audio={false}
                            mirrored={false}
                            ref={imageRef}
                            forceScreenshotSourceSize={true}
                            screenshotFormat='image/png'
                            screenshotQuality={1}
                            videoConstraints={{frameRate:30}}
                            className='webcam'
                            />
                            {captureImage && (
                                <img src={currentImage} className='capture-img'/>
                            )}
                    </div>
                    <img src="./images/frame.png" className='overlay-img' alt="" />
               {/* <canvas ref={canvasRef} style={{display:'none'}}></canvas> */}
                </div>
            </div>
            <div className="side-img">
                <img src="./images/right-img.png" alt="" />
            </div>
        </>
    )
}

export default CameraBooth;