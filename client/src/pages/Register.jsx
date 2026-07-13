import { useNavigate } from "react-router-dom";

function Register() {
    
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="flex flex-col items-center gap-5 w-[90%] max-w-[380px] border px-10 py-12 pt-8 bg-white">
        <div className="w-full">
          <h1 className="self-start text-md pb-1">
            Welcome to <br />{" "}
            <span className="font-bold text-2xl">Clippointment!</span>
          </h1>
          <p className="text-sm text-gray-400">
            Please enter your details to register
          </p>
        </div>

        <div className="w-full">
          <label className="text-sm" htmlFor="email">
            Account name
          </label>
          <input
            id="account-name"
            className="border-2 p-2 w-full"
            type="email"
            placeholder="Juan dela Cruz"
          />
        </div>

        <div className="w-full">
          <label className="text-sm" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="border-2 p-2 w-full"
            type="email"
            placeholder="email@example.com"
          />
        </div>

        <div className="w-full">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="border-2 p-2 w-full"
            type="password"
          />
        </div>

        <div className="w-full">
          <label className="text-sm" htmlFor="password">
            Confirm password
          </label>
          <input
            id="confirm-password"
            className="border-2 p-2 w-full"
            type="password"
          />
        </div>

        <div className="w-full">
          <button
            className="bg-black text-white w-full p-3 hover:font-semibold"
            type="submit"
          >
            Create account
          </button>
          <p className="pt-2 text-sm text-center">
            Already have an account?{" "}
            <span
              className="text-blue-700 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>

        {/* {message && (
          <p className="text-red-500 bg-red-100 p-2 w-full text-center text-sm italic">
            {message}
          </p>
        )} */}
      </form>
    </div>
  );
}

export default Register;
