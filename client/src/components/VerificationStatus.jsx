import { CiFaceMeh } from "react-icons/ci";
import { CiFaceSmile } from "react-icons/ci";
import { CiFaceFrown } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { replace, useNavigate } from "react-router-dom";

function VerificationStatus({
  isVerified,
  title = "Verification Status",
  message = "This is the verification message",
  buttonMessage = "Redirect button",
}) {
  const navigate = useNavigate();

  return (
    <>
      {isVerified === null ? (
        <CiFaceMeh className="text-8xl text-gray-500" />
      ) : isVerified === true ? (
        <CiFaceSmile className="text-8xl text-green-500" />
      ) : (
        <CiCircleRemove className="text-8xl text-red-500" />
      )}
      <h1 className="text-2xl">{title}</h1>
      <p className="text-md text-gray-400 max-w-md text-center">{message}</p>
      {isVerified && (
        <button
          className="mt-6 text-blue-700 hover:font-semibold"
          onClick={() => navigate("/dashboard", { replace: true })}
        >
          {buttonMessage}
        </button>
      )}
    </>
  );
}

export default VerificationStatus;
