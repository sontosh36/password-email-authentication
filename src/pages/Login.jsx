import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router';
import { auth } from '../firebase/firebase.init';

const Login = () => {
    const [error, setError] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef();
    const handleLogin = e =>{
        e.preventDefault();
        const email = emailRef.current.value;
        const password =passwordRef.current.value;
        console.log(email, password);

        setError('');

        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user);
            if (!result.user.emailVerified) {
                alert('please verified your email address');
            }
        })
        .catch(err =>{
            setError(err.message);
        })
    }

    const handleForgetPassword = () =>{
        const email = emailRef.current.value;
        sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert('please check your email');
        })
        .catch(err =>{
            console.log(err);
        })
    }
    return (
    <div className="card bg-base-100 w-full m-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-center text-4xl font-bold">Sign In</h1>
        <form onSubmit={handleLogin}>
            <fieldset className="fieldset">
            <label className="label">Email</label>
            <input type="email" ref={emailRef} className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input type="password" ref={passwordRef} className="input" placeholder="Password" />
            <div onClick={handleForgetPassword}>
                <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Sign In</button>
        </fieldset>
        </form>
        {
            error && <p className='text-red-500'>{error}</p>
        }
        <p>You our new User ? please <Link className='text-green-500 underline' to='/register'>Sign Up</Link> </p>
      </div>
    </div>
    );
};

export default Login;