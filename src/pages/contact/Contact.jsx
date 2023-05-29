import { useRef, useState } from 'react';
import { Button } from "react-bootstrap";
import FormApi from "../../api/formApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "./contact.module.css";
import { setLoader } from '../../redux/loading';




const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const formApi = new FormApi();

export default function Contact() {


    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);
    const phoneNumberRef =  useRef(null);


    const [emailErrorMessage, setEmailErrorMessage] = useState(null);
    const [nameErrorMessage, setNameErrorMessage] = useState(null);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState(null);
   
    const dispatch = useDispatch();


    const handleSubmit = async () => {

        const email = emailRef.current.value;
        const name = nameRef.current.value;
        const message = messageRef.current.value;
        const number =  phoneNumberRef.current.value;
        console.log("nam",phoneErrorMessage)
        if (!name) {
            setNameErrorMessage("Name is required!");
        } else {
            setNameErrorMessage(null);
        }
        // if (!number) {
        //    setPhoneErrorMessage("Phone number is required!");
        // } else {
        //     setPhoneErrorMessage(null);
        // }
        if (!email) {
            setEmailErrorMessage("Email address is required!");
            return;
        }
        setEmailErrorMessage(null);

        if (!emailRegex.test(email)) {
            setEmailErrorMessage("Email address is not valid!");
            return;
        }
        setEmailErrorMessage(null);

        if (nameErrorMessage) {
            return;
        }
        // if (phoneErrorMessage) {
        //     return;
        // }
      
        const form = {
            name,
            email,
            message,
            number,
        };
        try {
            dispatch(setLoader(true));
            await formApi.sendForm(form);
            toast.success("Thank you for contacting us, the form has been sent!");
            nameRef.current.value = "";
            messageRef.current.value = "";
            emailRef.current.value = "";
            phoneNumberRef.current.value = "";
            
        } catch (err) {
            toast.error(err.message);
        } finally {
            dispatch(setLoader(false))
        };

    };
  

    return (
        <>
            <div className={styles.fill}>

                <div>
                    <h1 className='text-center'> HELLO</h1>
                    <h2 className={styles.contactPageTitle}>
                        We'd Love to hear From You !
                    </h2>
                    <div className={styles.contactForm}>

                        <label htmlFor="name" className={styles.label}>
                            Full name*
                        </label>
                        <input
                            type="text"
                            id="name"
                            className={`${styles.textInput} ${nameErrorMessage ? styles.invalid : ""
                                }`}
                            ref={nameRef}
                        />
                          <label>
                            Phone Number
                          <PhoneInput
                          international
                            placeholder="Enter your phone number"
                            defaultCountry="AM"
                            value={phoneErrorMessage}
                            onChange={setPhoneErrorMessage}
                            ref={phoneNumberRef}
                            />
                          </label>
                    
                        <label htmlFor="email" className={styles.label}>
                            Email*
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="example@gmail.com"
                            className={`${styles.textInput} ${emailErrorMessage ? styles.invalid : ""
                                }`}
                            ref={emailRef}
                        />

                        <label htmlFor="message" className={styles.label}>
                            Message
                        </label>
                        <textarea
                            id="message"
                            className={styles.textInputs}
                            rows={5}
                            ref={messageRef}
                        />
                        <Button
                            variant="primary"
                            className={styles.submit}
                            onClick={handleSubmit}
                        >
                            Send
                        </Button>
                        {nameErrorMessage && (
                            <h5 className={`${styles.errorMessage} mt-2 p-1`}>
                                {nameErrorMessage}
                            </h5>
                        )}
                        {emailErrorMessage && (
                            <h5 className={`${styles.errorMessage} mt-2 p-1`}>
                                {emailErrorMessage}
                            </h5>
                        )}
                     
                    </div>
                </div>
            </div>

            <footer >
                <div className={styles.socialLogos}>
                    <h2 >
                        <span>Connect with us on social media</span>
                    </h2>

                    <div className={styles.iconContainer}>

                        <div >
                            <a href="https://www.facebook.com/sharer.php?u=https%3A%2F%2Fminehashrate.com%2Fcaptchas-i-am-not-robot-with-code-examples%2F" aria-label="Share on Facebook" >

                                <span >
                                    <svg className={styles.icon} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                                        <path d="M5.677,12.998V8.123h3.575V6.224C9.252,2.949,11.712,0,14.736,0h3.94v4.874h-3.94
								c-0.432,0-0.934,0.524-0.934,1.308v1.942h4.874v4.874h-4.874V24H9.252V12.998H5.677z"></path>
                                    </svg>
                                </span>
                            </a>
                        </div>

                        <div >
                            <a href="https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fminehashrate.com%2Fcaptchas-i-am-not-robot-with-code-examples%2F&amp;media=&amp;description=Captchas+I+Am+Not+Robot+With+Code+Examples+In+this+session%2C+we%E2%80%99ll+strive+our+hand+at+fixing+the+Captchas+I+Am+Not+Robot+puzzle+through+the+use+of+the+pc+language.+The+code+that%27s+displayed+under+illustrates+this+level.+script%26hellip%3B" aria-label="Share on Pinterest" >

                                <span >
                                    <svg className={styles.icon} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                                        <path d="M13.757,17.343c-1.487,0-2.886-0.804-3.365-1.717c0,0-0.8,3.173-0.969,3.785
								c-0.596,2.165-2.35,4.331-2.487,4.508c-0.095,0.124-0.305,0.085-0.327-0.078c-0.038-0.276-0.485-3.007,0.041-5.235
								c0.264-1.118,1.772-7.505,1.772-7.505s-0.44-0.879-0.44-2.179c0-2.041,1.183-3.565,2.657-3.565c1.252,0,1.857,0.94,1.857,2.068
								c0,1.26-0.802,3.142-1.216,4.888c-0.345,1.461,0.734,2.653,2.174,2.653c2.609,0,4.367-3.352,4.367-7.323
								c0-3.018-2.032-5.278-5.731-5.278c-4.177,0-6.782,3.116-6.782,6.597c0,1.2,0.355,2.047,0.909,2.701
								c0.255,0.301,0.29,0.422,0.198,0.767c-0.067,0.254-0.218,0.864-0.281,1.106c-0.092,0.349-0.375,0.474-0.69,0.345
								c-1.923-0.785-2.82-2.893-2.82-5.262c0-3.912,3.3-8.604,9.844-8.604c5.259,0,8.72,3.805,8.72,7.89
								C21.188,13.307,18.185,17.343,13.757,17.343z"></path>
                                    </svg>
                                </span>
                            </a>
                        </div>

                        <div >
                            <a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fminehashrate.com%2Fcaptchas-i-am-not-robot-with-code-examples%2F&amp;title=Captchas%20I%20Am%20Not%20Robot%20With%20Code%20Examples&amp;summary=Captchas+I+Am+Not+Robot+With+Code+Examples+In+this+session%2C+we%E2%80%99ll+strive+our+hand+at+fixing+the+Captchas+I+Am+Not+Robot+puzzle+through+the+use+of+the+pc+language.+The+code+that%27s+displayed+under+illustrates+this+level.+script%26hellip%3B&amp;source=https://minehashrate.com/" >

                                <span >
                                    <svg className={styles.icon} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                                        <path d="M6.52,22h-4.13V8.667h4.13V22z M4.436,6.92
								c-1.349,0-2.442-1.101-2.442-2.46C1.994,3.102,3.087,2,4.436,2s2.442,1.102,2.442,2.46C6.877,5.819,5.784,6.92,4.436,6.92z
								M21.994,22h-4.109c0,0,0-5.079,0-6.999c0-1.919-0.73-2.991-2.249-2.991c-1.652,0-2.515,1.116-2.515,2.991c0,2.054,0,6.999,0,6.999
								h-3.96V8.667h3.96v1.796c0,0,1.191-2.202,4.02-2.202c2.828,0,4.853,1.727,4.853,5.298C21.994,17.129,21.994,22,21.994,22z">
                                        </path>
                                    </svg>
                                </span>
                            </a>
                        </div>

                        <div >
                            <a href="https://twitter.com/" aria-label="Share on Twitter" >

                                <span >
                                    <svg className={styles.icon} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                                        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 
                                1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 
                                6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 
                                2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 
                                3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 
                                13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
                                    </svg>
                                </span>
                            </a>
                        </div>



                    </div >

                </div >
            </footer >
        </>
    );
}
