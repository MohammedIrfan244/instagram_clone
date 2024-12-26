import Login from "../components/Login";
import LoginImage from "../components/LoginImage";

function LandingPage() {
  return (
    <div className="bg-black min-h-screen flex flex-col md:flex-row ">
      <div className="hidden md:flex w-1/2 justify-end">
        <LoginImage />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start md:ps-6">
        <Login />
      </div>
    </div>
  );
}

export default LandingPage;
