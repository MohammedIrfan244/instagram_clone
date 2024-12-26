import login from '../assets/instagram_home.png'

function LoginImage() {
  return (
    <div className="flex justify-end items-center h-screen">
      <img src={login} alt="instagram homepage" />
    </div>
  )
}

export default LoginImage
