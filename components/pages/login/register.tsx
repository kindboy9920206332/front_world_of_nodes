"use client";

import { AuthShell, Field, GhostButton, PrimaryButton } from "@/components/ui/inputAndBtnLogin";
import { useAuthFormsStore } from "@/stors/login";
import { RegisterResponse, RegisterResult } from "@/types/login";
import { apiClient } from "@/utils/fetching";
import { tokenStore } from "@/utils/getToken";
import { useRouter } from "next/navigation";
const services = new apiClient()
const cash = tokenStore



export default function Register() {
  const { register,otp, setRegisterField, resetRegister } = useAuthFormsStore();
  const router = useRouter()
  

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res  =  await services.post({isJwt:false , request:{email:otp.email , password:register.password , otp:register.otp ,  name:register.name , userName:register.userName , invitedByUserId:register.invitedByUserId }  , url:"/user/register"}) as RegisterResponse

    if (res.res.status===200){
        cash.setAccess(res.data?.data.accessToken)
        cash.setRefresh(res.data?.data.refreshToken)
        router.push("/employeeStart");
        }
    console.log(res)
    console.log("REGISTER_FORM:", register , otp);
  };

  return (
    <AuthShell
      title="Create Account"
      subtitle="Enter your details to register. You can wire your APIs later."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field
          label="Name"
          value={register.name}
          onChange={(v) => setRegisterField("name", v)}
          placeholder="Your display name"
        />

        <Field
          label="Username"
          value={register.userName}
          onChange={(v) => setRegisterField("userName", v)}
          placeholder="node_master"
        />

        <Field
          label="Password"
          type="password"
          value={register.password}
          onChange={(v) => setRegisterField("password", v)}
          placeholder="••••••••"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="OTP (optional)"
            value={register.otp}
            onChange={(v) => setRegisterField("otp", v)}
            placeholder="123456"
          />
          <Field
            label="Invited By User ID (optional)"
            value={register.invitedByUserId}
            onChange={(v) => setRegisterField("invitedByUserId", v)}
            placeholder="e.g. 64f..."
          />
        </div>

        <PrimaryButton type="submit">Submit</PrimaryButton>
        <GhostButton onClick={resetRegister}>Reset</GhostButton>
      </form>
    </AuthShell>
  );
}

