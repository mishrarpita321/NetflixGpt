import { LOGO_URL } from "../constants/constants"

const Header = () => {
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10">
      <img src={LOGO_URL} alt="logo" className="w-45"/>
    </div>
  )
}

export default Header