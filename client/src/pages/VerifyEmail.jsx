import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import VerificationStatus from "../components/VerificationStatus.jsx";
import api from "../api/axios.js";
import { timeToMinute } from "../../../server/utils/time.util.js";
import { useAuth } from "../context/AuthContext.jsx";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [IsVerifying, setIsVerifying] = useState(true);
  const [verification, setVerification] = useState({
    isVerified: null,
    title: "Trying to verify your email",
    message: "Verifying your email. Please wait...",
  });

  const { setUser } = useAuth();

  // get token from the url query parameter
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await api.get(
          `/auth/email-verifications?token=${token}`,
          {
            skipAuthRefresh: true,
          },
        );

        if (response.status === 200) {
          setVerification({
            isVerified: true,
            title: "Email verified",
            message: "Your email has been successfully verified.",
            buttonMessage: "Go to dashboard",
          });
        }

        // set user to auth context in order to access protected routes
        setUser(response.data.user);
      } catch (error) {
        if (error.response.status === 400) {
          setVerification({
            isVerified: false,
            title: "Email verification failed",
            message:
              "We couldn't verify your email. The verification link may have expired or is no longer valid.",
          });
        } else {
          setVerification({
            isVerified: false,
            title: "Something went wrong",
            message:
              "We couldn't verify your email. You may have made too many attempts, or there may be an issue on our end. Please try again later.",
          });
        }
      }
    };

    verifyToken();
  }, [token]);

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-2">
      <VerificationStatus
        isVerified={verification.isVerified}
        title={verification.title}
        message={verification.message}
        buttonMessage={verification.buttonMessage}
      />
    </main>
  );
}

export default VerifyEmail;
