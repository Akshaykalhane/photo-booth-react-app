import html2canvas from "html2canvas";

const downloadImage=(frame)=>{
            const image = window.document.createElement('a');
            image.download = 'image.png';
            image.href = frame;
            document.body.appendChild(image)
            image.click();
            document.body.removeChild(image)
            // setSuccess(true)
            // setCaptureImage(null)
            // setMessage('Image Downloaded')
}

const drawImage=async(canvasRef)=>{
    const canvas = await html2canvas(canvasRef.current,{
        useCORS:true,
        scale:1,
    })
    const imageSrc = canvas.toDataURL('image/png',1.0);
    downloadImage(imageSrc);
}

export default drawImage;