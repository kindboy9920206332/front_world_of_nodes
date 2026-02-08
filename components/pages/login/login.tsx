"use client";

import { AuthShell, Field, GhostButton, PrimaryButton } from "@/components/ui/inputAndBtnLogin";
import { useAuthFormsStore } from "@/stors/login";
import { LoginResponse } from "@/types/login";
import { apiClient } from "@/utils/fetching";
import { tokenStore } from "@/utils/getToken";
import { useRouter } from "next/navigation";
import { useState } from "react";

const services = new apiClient();
const cash = tokenStore;

export default function Login() {
  const { login, otp, setLoginField, resetLogin } = useAuthFormsStore();
  const [error, setError] = useState<{ status: string; message: string; type: boolean } | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await services.post({
      isJwt: false,
      request: { identifier: otp.email, password: login.password, otp: login.otp },
      url: "/user/login",
    }) as LoginResponse;

    console.log(res)
    if (res.res.status === 200) {
      console.log(res.data.data.accessToken)
      cash.setAccess(res.data.data.accessToken);
      cash.setRefresh(res.data.data.refreshToken);
      router.push("/");
    } else {
      if (res.res.status === 404)
        setError({ message: "otp is not valid ", status: "otp", type: true });
      if (res.res.status === 400)
        setError({ message: "password is not correct", status: "password", type: true });
    }
    console.log(res);
    console.log("LOGIN_FORM:", login, otp);
  };

  return (
    <AuthShell
      title="Sign In"
      subtitle="Enter your otp and password to continue."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        
        {error?.status === "otp" && error?.type && (
          <div className="bg-danger text-white p-3 rounded-lg shadow-lg">
            <p>{error.message}</p>
          </div>
        )}

        {error?.status === "password" && error?.type && (
          <div className="bg-danger text-white p-3 rounded-lg shadow-lg">
            <p>{error.message}</p>
          </div>
        )}

        <Field
          label="Password"
          type="password"
          value={login.password}
          onChange={(v) => setLoginField("password", v)}
          placeholder="••••••••"
        />

        <Field
          label="OTP (optional)"
          value={login.otp}
          onChange={(v) => setLoginField("otp", v)}
          placeholder="123456"
        />

        <PrimaryButton type="submit">Login</PrimaryButton>
        <GhostButton onClick={resetLogin}>Reset</GhostButton>
      </form>
    </AuthShell>
  );
}
