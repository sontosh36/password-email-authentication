import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from './../firebase/firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] =useState(false);
  const nameRef = useRef();
  const photoRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
    const handleSubmit = (e) =>{
        e.preventDefault();
        const name = nameRef.current.value;
        const photo = photoRef.current.value;
        const email = emailRef.current.value;
        const pass = passwordRef.current.value;
        const term =e.target.terms.checked;
        console.log(email, pass, term);
        
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
        if (!passwordPattern.test(pass)) {
          setError('Password must be at least 6 character long, and include at least one uppercase, one Lowercase and one special character.');
          return;
        }
        setError('')
        setSuccess(false);

        if (!term) {
          setError('Please accept our terms and conditions');
          return;
        }
       createUserWithEmailAndPassword(auth, email, pass)
       .then(result =>{
        console.log(result.user);
        setSuccess(true);
        e.target.reset();
        // update profile
        const profile = {
          displayName: name,
          photoURL : photo
        }
        updateProfile(result.user, profile)
        .then(() =>{
          console.log('update profile');
        })
        .catch(err =>{
          console.log(err);
        })
        // sent verification email
        sendEmailVerification(result.user)
        .then(() => {
          alert('Please login to your email and verify email address.');
        })
       })
       .catch(err =>{
        setError(err.message);
       })
        
    }
    const handleShowPass = (e) =>{
      e.preventDefault();
      setShowPass(!showPass);
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign Up</h1>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
          <label className='label'>Name</label>
          <input type="text" ref={nameRef} className='input' placeholder='Your Name'/>
          <label className='label'>Photo URL</label>
          <input type="text" ref={photoRef} className='input' placeholder='photo URL' />
          <label className="label">Email</label>
          <input type="email" ref={emailRef} className="input" placeholder="Email" />
          <label className="label">Password</label>
          <div className='relative'>
            <input type={showPass ? 'text': 'password'} ref={passwordRef} className="input" placeholder="Password" />
            <button onClick={handleShowPass} className='btn btn-xs absolute top-2 right-4'>{showPass ? <FaEyeSlash/>: <FaEye/>}</button>
          </div>
          <div>
            <label className='label'>
              <input type="checkbox" name='terms' class='checkbox' /> Accept Our Terms & Conditions
            </label>
          </div>
          <button className="btn btn-neutral mt-4">Sign Up</button>
        </fieldset>
        {
          success && <p className='text-green-500'>Account create successfully</p>
        }
        {
          error && <p className='text-red-500'>{error}</p>
        }
        </form>
        <p>Already have an account? please <Link className='text-blue-500 underline' to='/login'> Login</Link></p>
      </div>
    </div>
  </div>
</div>
    );
};

export default Register;