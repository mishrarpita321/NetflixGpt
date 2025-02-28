import { useRef, useState } from "react"
import { BODY_IMG_URL, ICON_URL } from "../constants/constants"
import Header from "./Header"
import { validateFormFields } from "../utils/utils";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showErr, setShowErr] = useState<string | null>(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignUp((prev) => !prev);
  }

  const name = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const message = validateFormFields(email.current?.value || "", password.current?.value || "");
    setShowErr(message);
    if (message) return;

    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email.current?.value || "", password.current?.value || "")
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current?.value || "", photoURL: ICON_URL
          }).then(() => {
            const currentUser = auth.currentUser;
            if (currentUser) {
              const { uid, email, displayName, photoURL } = currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              navigate("/browse");
            }
          }).catch((error) => {
            setShowErr(error.message)
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setShowErr(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current?.value || "", password.current?.value || "")
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setShowErr(errorCode + "-" + errorMessage);
        });
    }
  }

  return (
    <div>
      <Header />
      <div className="absolute inset-0">
        <img src={BODY_IMG_URL} className="w-full h-full object-cover" />
      </div>
      <form className="w-5/12 p-12 bg-black/80 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-bold text-3xl py-4 text-white">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>

        {isSignUp && (
          <input
            type="text"
            ref={name}
            placeholder="Enter full name"
            className="p-4 my-4 bg-gray-500 text-white w-full rounded-sx"
          />
        )}

        <input
          type="email"
          ref={email}
          placeholder="Enter email or phone number"
          className="p-4 my-4 bg-gray-500 text-white w-full rounded-sx"
        />

        <input
          type="password"
          ref={password}
          placeholder="Enter password"
          className="p-4 my-4 bg-gray-500 text-white w-full rounded-sx"
        />

        {showErr && <p className="text-red-500 font-bold text-lg">{showErr}</p>}

        <button
          onClick={(e) => handleClick(e)}
          className="p-4 my-4 bg-red-700 cursor-pointer w-full text-white rounded-sm"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <p
          className="text-white p-4 my-4 cursor-pointer hover:underline"
          onClick={toggleSignInForm}
        >
          {isSignUp ? "Already have an account? Sign In" : "New to Netflix? Sign Up"}
        </p>
      </form>
    </div>
  )
}

export default Login