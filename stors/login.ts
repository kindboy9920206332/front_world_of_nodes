// stores/useAuthFormsStore.ts
import { create } from "zustand";

type RegisterForm = {
  email: string;
  password: string;
  name: string;
  userName: string;
  otp: string;
  invitedByUserId: string;
};

type LoginForm = {
  email: string;
  password: string;
  otp:string;
};

type OtpForm = {
  email: string;
  otp: string;
};

type Step = "otp" | "login" | "register"

type AuthFormsState = {
  register: RegisterForm;
  login: LoginForm;
  otp: OtpForm;
  step : Step


  setRegisterField: <K extends keyof RegisterForm>(key: K, value: RegisterForm[K]) => void;
  setLoginField: <K extends keyof LoginForm>(key: K, value: LoginForm[K]) => void;
  setOtpField: <K extends keyof OtpForm>(key: K, value: OtpForm[K]) => void;

  setStep:(state:Step)=>void
  resetRegister: () => void;
  resetLogin: () => void;
  resetOtp: () => void;
};

const initialRegister: RegisterForm = {
  email: "",
  password: "",
  name: "",
  userName: "",
  otp: "",
  invitedByUserId: "",
};

const initialLogin: LoginForm = {
  email: "",
  password: "",
  otp:""
};

const initialOtp: OtpForm = {
  email: "",
  otp: "",
};



export const useAuthFormsStore = create<AuthFormsState>((set) => ({
  register: initialRegister,
  login: initialLogin,
  otp: initialOtp,
  step:"otp",
    
  setStep:(state:Step)=>set(()=>({step:state})), 

  setRegisterField: (key, value) =>
    set((s) => ({ register: { ...s.register, [key]: value } })),

  setLoginField: (key, value) =>
    set((s) => ({ login: { ...s.login, [key]: value } })),

  setOtpField: (key, value) =>
    set((s) => ({ otp: { ...s.otp, [key]: value } })),

  resetRegister: () => set({ register: initialRegister }),
  resetLogin: () => set({ login: initialLogin }),
  resetOtp: () => set({ otp: initialOtp }),
}));
