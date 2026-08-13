import { CiFaceMeh } from "react-icons/ci";
import { CiFaceSmile } from "react-icons/ci";
import { CiFaceFrown } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";

function VerificationStatus({
  isVerified,
  title = "Verification Status",
  message = "This is the verification message",
  buttonMessage = "Button Message",
}) {
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
      <p className="text-md text-gray-400">{message}</p>
      {isVerified !== null && (
        <button className="mt-6 text-blue-700 hover:font-semibold">
          {buttonMessage}
        </button>
      )}
    </>
  );
}

export default VerificationStatus;
