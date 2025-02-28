import { onAuthStateChanged, signOut } from "firebase/auth";
import { LOGO_URL } from "../constants/constants"
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import { addUser, removeUser, UserState } from "../utils/userSlice";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store.user) as UserState | null

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      console.log(error)
    });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid, email, displayName, photoURL}))
        navigate("/browse");
      } else {
        dispatch(removeUser(null))
        navigate("/");
      }
    });

    return () => unsubscribe();
  },[])

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img src={LOGO_URL} alt="logo" className="w-45" />
      {user && <div className="flex p-2">
        <img src={user.photoURL || ""} alt="logo" className="w-12 h-12" />
        <button className="font-bold text-white mx-2 cursor-pointer" onClick={handleSignOut}>SignOut</button>
      </div>}
    </div>
  )
}

export default Header