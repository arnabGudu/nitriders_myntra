import React,{useEffect,useState,useRef} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import './ProductPage.css'
import WebcamCapture from '../WebcamCapture/WebcamCapture';
import HomeCategorySlider from '../HomeCategorySlider/HomeCategorySlider'
import WebcamOrFile from '../WebcamOrFile/WebcamOrFile'
import Carousel from 'react-elastic-carousel'
import Loader from '../Loader/Loader'


function ProductPage() {

    let [size,setSize] = useState('')
    let {category_id,product_id} = useParams()
    let [product,setProduct] = useState(null)
    let [category,setCategory] = useState(null)
    let [capture,setCapture] = useState(false)
    let [webcamIsOn,setWebcamIsOn] = useState(false)
    let [trialRoomImage,setTrialRoomImage] = useState('')
    let [displayLoader,setDisplayLoader] = useState(false)

    let productImageContainerRef = useRef(null)

    //event handler for when the user clicks on the try it on button
    const handleTryItOnClick = (e)=>{
        e.preventDefault();
        // setCapture(!capture)
        setDisplayLoader(true)
        setTimeout(()=>{
            setDisplayLoader(false)
            setTrialRoomImage('https://192.168.1.34:5000/upload/image_10.jpg')
            window.scrollTo(0,0)
        },5000)
        
    }

    //event handler for selecting size
    const handleSizeSelect = (event,element)=>{
        let btns= document.getElementsByClassName('size-btn')
        let btn_array = Array.from(btns)
        btn_array.forEach((btn)=>{
            btn.classList.remove('size-btn-active')
        })
        // let element = document.querySelector()
        event.target.classList.add('size-btn-active')
        setSize(event.target.innerHTML)
    }

    //event handler for switiching on the webcam
    const handleSwitichingOnWebCam =(event)=>{
        event.preventDefault();
        setWebcamIsOn(true)
        setCapture(false)
    }

    //closing the trial room pop-up
    const handleCaptureClose = (event)=>{
        event.preventDefault();
        handleCleanUp()

    }

    //helper fuction for closing the trial room pop-up 
    const handleCleanUp = ()=>{
        setCapture(false)
        setWebcamIsOn(false)
    }

    //use-effect hook used as component should update
    useEffect(()=>{

        const config ={
            headers:{
                "Content-type" :  "application/json"
            }
        }
       


        axios.get(`https://192.168.1.34:5000//category/${category_id}/product/${product_id}`,config)
            .then(res => {
                setProduct(res.data.product)
                setCategory(res.data.category)
                setTrialRoomImage('')
            })
            .catch(err=>{
                console.log()
            })

        let btns= document.getElementsByClassName('size-btn')

        let btn_array = Array.from(btns)
        btn_array.forEach((btn)=>{
            btn.addEventListener('click',handleSizeSelect)
        })
    },[product_id,category_id])




    return product&&category&&(
        <>
            <div className='product-outer-container' >
                <div className='product-container'>
                <div ref={productImageContainerRef} className='product-image-container'>
                    {trialRoomImage?
                     (<Carousel itemsToScroll={1} itemsToShow={1}>
                         <img className='product-image' src={trialRoomImage}/>
                         <img className='product-image' src={`https://192.168.1.34:5000//upload/${product.image}`}/>
                     </Carousel>):
                     <img className='product-image' src={`https://192.168.1.34:5000//upload/${product.image}`}/>
                    }
                </div>
                <div className='product-info-container'>
                    <div >
                        
                        <h2 className='product-brand'>{product.brand}</h2>
                        <h3 className='product-description'>{[product.description]}</h3>
                    </div>
                    <div className='product-price'>
                        <span>
                            <span className='product-discountedPrice'>{`Rs.${(product.regular_price*(1-(product.discount/100)))}`}</span>
                            <span className='product-regularPrice strike'> {`Rs.${product.regular_price}`}</span>
                        </span>
                        <span className='product-discountPercentage'> ({`${product.discount}% OFF`})</span>
                        <p className='product-price-spl'>Inclusive of taxes</p>
                    </div>
                    <div style={{margin:'0 0 2rem 0'}}>
                        <h3 style={trialRoomImage?{}:{margin:'0 0 1rem 0'}}>Select Size</h3>
                        {<h4 style={{color:'orange',marginBottom:'1rem'}}>Recommended size - M</h4>}
                        <div className='size-btn-container'>
                            <button onClick={handleSizeSelect} className='size-btn'>S</button>
                            <button onClick={handleSizeSelect} className='size-btn'>M</button>
                            <button onClick={handleSizeSelect} className='size-btn'>L</button>
                            <button onClick={handleSizeSelect} className='size-btn'>XL</button>
                        </div>
                    </div>
                    <div style={{margin:'0 0 2rem 0'}} className='product-btn-box'>
                        <button className='product-btn cart-btn'><i className="btn-icon fas fa-shopping-bag"></i> Add To Bag</button>
                        <button onClick={handleTryItOnClick} className='product-btn trial-room-btn'><i className="btn-icon fas fa-male"></i> Try It On</button>
                    </div>
                    <div className='best-offers-container' >
                        <h3 style={{margin:'0 0 1rem 0'}}>Best Offers</h3>
                        <p>100% Original Products</p>
                        <p>Free Delivery on order above Rs. 799</p>
                        <p>Pay on delivery might be available</p>
                        <p>Easy 30 days returns and exchanges</p>
                        <p>Try and Buy might be available</p>
                    </div>
                </div>
                </div>
            </div>
            <div style={{background:'#f7f7f7'}}>
                <div className='category-info-container'>
                    <div style={{ border: 'solid 5px transparent',marginBottom:'2rem'}} className='category-title'>
                        <h1 style={{background:'#f7f7f7',paddingBottom:'5px'}}>Similiar Products</h1>
                    </div>
                </div>
                <HomeCategorySlider category={category} />
            </div>

            {displayLoader && <div className='overlay-trial-room'></div>}
            {displayLoader &&   (<Loader/>)}
            {/* {(capture || webcamIsOn) && <div className='overlay-trial-room'></div>} */}

            {/* {capture && <WebcamOrFile handleCaptureClose={handleCaptureClose} handleSwitichingOnWebCam={handleSwitichingOnWebCam} />}
            {webcamIsOn && <WebcamCapture handleCaptureClose={handleCaptureClose} handleCleanUp={handleCleanUp} setTrialRoomImage={setTrialRoomImage}/>} */}
        </>
    )
}

export default ProductPage
