import React, { useState } from 'react';
import "./Register.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom" //Navigate
import Logo from '../../moneyManLogo1.png';


  const Register = () => {
    // // const [name, setName] = useState("");
    // // setName('Owen')
    const [formState, setFormState] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleFormInput = (e) => {
      setFormState({
        ...formState,
        [e.currentTarget.name]: e.currentTarget.value,
      });
      console.log(formState);
    };
  
    // const [goToLogin, setGoToLogin] = useState(false);
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("submit", formState)
      //going to pass form state into post
      try {
        const response = await axios.post(
          'http://localhost:3001/api/Register',
          // eslint-disable-next-line no-undef
          formState,
          {
            headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }
          },
        ); 
        console.log(response.data);
        console.log(JSON.stringify(response));
        if (response) {
          console.log('successful response');
          window.alert("Successful registration. Please log in.");
          navigate("/");
          return response.data;
        }
       
      } catch (err) {
        if (!err?.response) {
          setMessage('No Server Response');
        } else if (err.response?.status === 409) {
          setMessage('Username Taken');
        } else {
          setMessage('Registeration Failed');
        }
        // handleModalChange(e);
      }
    }
      
    return (
        <div>
          <div className="logo-name">Money Managed</div>
          <div className="img-div">
            <img src={Logo} alt="Money Managed Logo" className="logo" />
          </div>
          <form className="inner-register-div">
            <h5>Create An Account</h5>
            <input
              type="text"
              name="firstName"
              onChange={(e)=>handleFormInput(e)}
              placeholder="First Name"
              required
            />
            <br />
            <br />
            <input
              type="text"
              name="lastName"
              onChange={(e)=>handleFormInput(e)}
              placeholder="Last Name"
              required
            />
            <br />
            <br />
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e)=>handleFormInput(e)}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              placeholder="Email"
            />
            <br />
            <br />
            <input
              type="password"
              id="password"
              onChange={(e)=>handleFormInput(e)}
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              placeholder="Password"
              required
            />
            <br />
            <br />
            <input
              type="password"
              id="confirmPassword"
              onChange={(e)=>handleFormInput(e)}
              name="confirmPassword"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              placeholder="Password"
              required
            />
            <br />
            <br />
            <button type="submit" onClick={(e)=>handleSubmit(e)} className="button">
              SIGN UP
            </button>
            {/* {name === 'password' && <input type="submit" value="Submit" title="submitUser" />} */}
            <p>Already have an account?</p>
            <Link to="/">Sign in</Link>
            <p>{message}</p>
          </form>
        </div>
      );
    };

export default Register
