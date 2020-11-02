import React,{useState} from 'react'
import './LandingPage.css'
import {history} from '../../helpers/history'
import {useSelector} from 'react-redux'
import WebcamOrFile from '../WebcamOrFile/WebcamOrFile'
import WebcamCapture from '../WebcamCapture/WebcamCapture'
import SizeChart from '../SizeChart/SizeChart'
import Loader from '../Loader/Loader'

function LandingPage() {

    let isAuthenticated = useSelector(state=> state.auth.isAuthenticated)
    let [webcamIsOn,setWebcamIsOn] = useState(false)
    let [capture,setCapture] = useState(false)
    let [captureDone,setCaptureDone] = useState(false)
    let [displayLoader,setDisplayLoader] = useState(false)
    

    const handleMeasureSize = (event)=>{
        event.preventDefault();
        if(isAuthenticated){
            setCapture(true)
        }
        else{
            history.push('/auth')
        }
    }

    //helper fuction for closing the trial room pop-up 
    const handleCleanUp = ()=>{
        setCapture(false)
        setWebcamIsOn(false)
        setCaptureDone(false)
        setDisplayLoader(false)
    }

    //closing the trial room pop-up
    const handleCaptureClose = (event)=>{
        event.preventDefault();
        handleCleanUp()
    }

    //event handler for switiching on the webcam
    const handleSwitichingOnWebCam =(event)=>{
        event.preventDefault();
        setWebcamIsOn(true)
        setCapture(false)
    }

    return (
        <>
            <div className='landing-page-container'>
                <h1>Virtual Trial Room</h1>
                <h1>and</h1>
                <h1>Size Assist</h1>
                <button onClick={handleMeasureSize} className='product-btn trial-room-btn'>measure size</button>
            </div>

            {(capture || webcamIsOn || captureDone || displayLoader) && <div className='overlay-trial-room'></div>}

            {capture && <WebcamOrFile handleCaptureClose={handleCaptureClose} handleSwitichingOnWebCam={handleSwitichingOnWebCam} />}
            {webcamIsOn && <WebcamCapture handleCaptureClose={handleCaptureClose} handleCleanUp={handleCleanUp} setCaptureDone={setCaptureDone} setDisplayLoader={setDisplayLoader} />}
            {displayLoader && <Loader/>}
            {captureDone && <SizeChart handleCleanUp={handleCleanUp}/>} 
        </>
    )
}

export default LandingPage
