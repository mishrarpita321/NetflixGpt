import { useState } from "react"
import { BODY_IMG_URL } from "../constants/constants"
import Header from "./Header"

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignInForm = () => {
    setIsSignUp((prev) => !prev);
  }

  return (
    <div>
      <Header />
      <div className="absolute inset-0">
        <img src={BODY_IMG_URL} className="w-full h-full object-cover" />
      </div>
      <form className="w-5/12 p-12 bg-black/80 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-bold text-3xl py-4 text-white">{isSignUp ? "Sign Up" : "Sign In"}</h1>
        {isSignUp && <input type="text" placeholder="Enter full name" className="p-4 my-4 bg-gray-500 text-white w-full rounded-sx" />}
        <input type="email" placeholder="Enter email or phone number" className="p-4 my-4 bg-gray-500 text-white w-full rounded-sx" />
        <input type="password" placeholder="Enter password" className="p-4 my-4 bg-gray-500 text-white w-full rounded-sx" />
        <button className="p-4 my-4 bg-red-700 cursor-pointer w-full text-white rounded-sm">{isSignUp ? "Sign Up" : "Sign In"}</button>
        <p className="text-white p-4 my-4 cursor-pointer hover:underline" onClick={toggleSignInForm} >{isSignUp ? "Already have an account? Sign In" : "New to Netflix? Sign Up"}</p>
      </form>
    </div>
  )
}

export default Login