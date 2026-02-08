"use client";

import Login from "@/components/pages/login/login";
import Otp from "@/components/pages/login/otp";
import Register from "@/components/pages/login/register";
import { useAuthFormsStore } from "@/stors/login";



export default function LoginPage() {
  const {step} = useAuthFormsStore();

  if (step === "register") return <Register />;
  if (step === "otp") return <Otp />;
  return <Login />;
}
