import React from 'react';
import LoginForm from '../components/login_form';
const Login = ({ handleLogin }) => {
    return (
        <div className="h-screen grid grid-cols-2">
            <div className="bg-blue-800 flex">
                <div className="m-auto text-center">
                    {/* <img className="m-auto" src={searchingSVG} /> */}
                    <h1 className="text-white font-bold text-4xl my-8">
                        ComplaintFix
                    </h1>
                    <p className="text-[#8BA3F8]">
                        At The Speed of Thought
                    </p>
                </div>
            </div>
            <div
                className="place-items-center m-auto px-16"
                style={{ width: '40vw' }}>
                {/* <h1 className="text-black-200 font-bold text-4xl mb-5">Hello!</h1> */}
                <p className="text-txt-blue-grey">
                    Please Login to continue
                </p>
                <div>
                    <LoginForm handleLogin={handleLogin} />
                </div>
            </div>
        </div>
    );
};

export default Login;