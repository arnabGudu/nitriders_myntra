import React from 'react'
import './WebcamOrFile.css'
function WebcamOrFile(props) {
    return (
        <div className='image-upload-options-container-wrap'>
            <button onClick={props.handleCaptureClose} className='cancel-btn'><i className="fas fa-times"></i></button>
            <div className='image-upload-options-container'>
                <h2 style={{marginBottom:'1rem'}}>Take or upload a photo</h2>
                <div className='upload-options-btn-container'>
                    <button onClick={props.handleSwitichingOnWebCam} className='upload-options-btn'>
                        <h2 className='btn-head'>Take Photo</h2>
                        <p className=''>Take a photo</p>
                        <p><i className="fas fa-camera"></i></p>
                        <p>Click</p>
                    </button>
                    <button className='upload-options-btn'>
                        <h2 className='btn-head'>Upload Photo</h2>
                        <p className=''>Upload a image file</p>
                        <p><i className="fas fa-file-upload"></i></p>
                        <p>Upload</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WebcamOrFile
