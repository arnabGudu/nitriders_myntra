import React,{useRef,useState,useCallback} from 'react'
import axios from 'axios'
import './WebcamCapture.css'
import Webcam from 'react-webcam'


function WebcamCapture(props) {

    
    const webcamRef = useRef(null);

    // initializing the states
    let [imgSrc, setImgSrc] = useState(null);
    let [firstClickDone,setFirstClickDone] = useState(false)
    let [secondClickDone,setSecondClickDone] = useState(false)
    let [logs,setLogs] = useState([])
    let [imageToBeSent,setImageToBeSent] = useState('')
    let [bodyForRequest,setBodyForRequest] = useState('')
    let [secondImage,setSecondImage] = useState('')
    var id ;

    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
      }, [webcamRef, setImgSrc]);

    const handleRetake = (event)=>{
        event.preventDefault()
        setImgSrc(null)
    }

    const deviceMotionEventHandler = (event) =>{
        id = requestAnimationFrame(()=>{
            // console.log('hello')
            setLogs((prevLogs)=>[...prevLogs,
                {
                xAcceleration: event.acceleration.x,
                yAcceleration: event.acceleration.y,
                zAcceleration: event.acceleration.z,
            }])
        })
    }

    const handleSubmit = useCallback((event)=>{
        event.preventDefault();
        // const config ={
        //     headers:{
        //         "Content-type" :  "application/json"
        //     }
        // }
        // const requ = {
        //     image:imgSrc
        // }
        // const body = JSON.stringify(requ)
        // axios.post(`http://localhost:5000//tryiton/product/${props.product.id}`,body,config)
        //     .then(res => {
        //         console.log(res.data)
        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     })


        // props.setTrialRoomImage('https://192.168.1.34:5000/upload/c1b89fdb-b250-44da-99ec-e2c34b13cd4f.jpg')
        // props.handleCleanUp()

        if(!firstClickDone && !secondClickDone){
            setFirstClickDone(true);
            setImageToBeSent(imgSrc)
            setImgSrc('')
            window.addEventListener('devicemotion',(event)=>deviceMotionEventHandler(event),)
        }
        else if(firstClickDone && !secondClickDone){
            const imageSrc = webcamRef.current.getScreenshot();
            // setImgSrc(imageSrc);
            // setSecondClickDone(true)
            // setSecondImage(imageSrc)
            window.removeEventListener('devicemotion',deviceMotionEventHandler)
            const req = {
                first_image: imageToBeSent,
                sensors_logs:logs,
                second_image:imgSrc
            }

            const body = JSON.stringify(req)
            console.log(body)
            // props.setTrialRoomImage('https://192.168.1.34:5000/upload/c1b89fdb-b250-44da-99ec-e2c34b13cd4f.jpg')
            // props.handleCleanUp()
            props.handleCleanUp()
            // props.setCaptureDone(true)
            props.setDisplayLoader(true)
            setTimeout(()=>{
                props.setDisplayLoader(false)
                props.setCaptureDone(true)
            },5000)
            cancelAnimationFrame(id)
        }

    })

    const videoConstraints = {
        width:480,
        height:300,
        facingMode: "environment"
    };

    console.log('It is being reloaded')

    return  (
        <div className='webcam-outer-container'>
            <div className='webcam-container'>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
                <button onClick={handleCapture} className='capture-btn'></button>
                <button onClick={props.handleCaptureClose} className='cancel-btn'><i className='fas fa-times'></i></button>
                
                {imgSrc && (<img src={imgSrc}/>)}
                {imgSrc &&(<button onClick={handleRetake} className='camera-icons retake'><i  className="fas fa-reply "></i></button>)}
                {imgSrc &&(<button onClick={handleSubmit} className='camera-icons save'><i  className="fas fa-check "></i></button>)}
                
                
            </div>
        </div>
    )
}

export default WebcamCapture
