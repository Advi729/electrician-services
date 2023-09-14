import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../slices/electricianSlice";

const ElectricianLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const data = {
        email, 
        password,
    }
    const dispatch = useDispatch();
    const handleSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/electrician/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if(result.status) {
                if (result.electrician.accessToken) {
                    localStorage.setItem("electrician", JSON.stringify(result.electrician));
                    dispatch(login(result.electrician));
                  }
                //   localStorage.removeItem("user");   
                console.log('accesstoken:;', result.electrician);
                navigate('/electrician/dashboard');
            }
        } catch (error) {
            console.error('error in login: ',error);
        }
    };

    return (
        // <div className="loginParentDiv">
        //     <label htmlFor="email">Email</label>
        //     <br/>
        //     <input 
        //         className="input"
        //         type="email"
        //         value={email}
        //         onChange={(e) => setEmail(e.target.value)}
        //         id="email"
        //         name="email"
        //     />
        //     <br/>
        //     <label htmlFor="password">Password</label>
        //     <br/>
        //     <input 
        //         className="input"
        //         type="password"
        //         value={password}
        //         onChange={(e) => setPassword(e.target.value)}
        //         id="password"
        //         name="password"
        //     />
        //     <br/>
        //     <button onClick={() => handleSubmit(data)}>Log In</button>
        // </div>
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your professional account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-orange-600 hover:text-orange-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={() => handleSubmit(data)}
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Log in
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to='/electrician-signup' className="font-semibold leading-6 text-orange-600 hover:text-orange-500">
              Create a professional account
            </Link>
          </p>
        </div>
      </div>
    </>
    );    
};

export default ElectricianLogin;