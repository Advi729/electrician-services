import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignup = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const data = {
        firstname: firstName, 
        lastname: lastName,
        email,
        phone,
        password,
    };

    const handleSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log(result.status);
            if(result.status) {
                navigate('/user-login');
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        // <div className="items-center">
        //         <label htmlFor="firstname">First Name</label>
        //         <br/>
        //         <input
        //           className="input"
        //           type="text"
        //           value={firstName}
        //           onChange={(e) => setFirstName(e.target.value)}
        //           id="firstname"
        //           name="firstname"
        //         />
        //         <br/>
        //         <label htmlFor="lastname">Last Name</label>
        //         <br/>
        //         <input
        //           className="input"
        //           type="text"
        //           value={lastName}
        //           onChange={(e) => setLastName(e.target.value)}
        //           id="lastname"
        //           name="lastname"
        //         />
        //         <br/>
        //         <label htmlFor="email">email</label>
        //         <br/>
        //         <input
        //           className="input"
        //           type="email"
        //           value={email}
        //           onChange={(e) => setEmail(e.target.value)}
        //           id="email"
        //           name="email"
        //         />
        //         <br/>
        //         <label htmlFor="phone">Phone number</label>
        //         <br/>
        //         <input
        //           className="input"
        //           type="number"
        //           value={phone}
        //           onChange={(e) => setPhone(e.target.value)}
        //           id="phone"
        //           name="phone"
        //         />
        //         <br/>
        //         <label htmlFor="password">Password</label>
        //         <br/>
        //         <input
        //           className="input"
        //           type="password"
        //           value={password}
        //           onChange={(e) => setPassword(e.target.value)}
        //           id="password"
        //           name="password"
        //         />
        //         <br/>
        //         <br/>
        //         <button onClick={() => handleSubmit(data)}>Sign Up</button>
        //     <p>login create here</p>
        // </div>
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
          <div>
              <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstname"
                  name="firstname"
                  type="firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="firstname"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastname"
                  name="lastname"
                  type="lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="lastname"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="phone"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={() => handleSubmit(data)}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Log into your account
            </Link>
          </p>
        </div>
      </div>
    </>
    );
};

export default UserSignup;