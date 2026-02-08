"use client";

import { AuthShell, Field, GhostButton, PrimaryButton } from "@/components/ui/inputAndBtnLogin";
import { useAuthFormsStore } from "@/stors/login";
import Login from "./login";
import { apiClient } from "@/utils/fetching";
import { OtpResponse } from "@/types/login";
const services = new apiClient()


export default function Otp() {
  const { otp, setOtpField, resetOtp , setStep } = useAuthFormsStore();

  

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res  =  await services.post({isJwt:false , request:{email:otp.email}  , url:"/user/sendOtp"}) as OtpResponse
    if (res.data.data.existUser){
        setStep("login")
    }
    else{
        setStep("register")
    }

    console.log(res)
    console.log("OTP_FORM:", otp);
  };

  return (
    <AuthShell
      title="Verify OTP"
      subtitle="Enter the verification code sent to your email."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field
          label="Email"
          type="email"
          value={otp.email}
          onChange={(v) => setOtpField("email", v)}
          placeholder="you@example.com"
        />
        <PrimaryButton type="submit">Verify</PrimaryButton>
        <GhostButton onClick={()=>{resetOtp}}>Reset</GhostButton>
      </form>
    </AuthShell>
  );
}

