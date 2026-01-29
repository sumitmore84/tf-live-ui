"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "@/Home/login/LoginForm";
import { SignUpForm } from "@/Home/login/SignUpForm";
export type ViewTypes = "login" | "signup";
type Props = {
  vt: ViewTypes;
};

export const AuthenticatioModel = ({ vt }: Props) => {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<ViewTypes>(vt);

  useEffect(() => {
    if (isAuthenticated) setOpen(false);
  }, [isAuthenticated]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (isOpen) {
      setView(vt); // 👈 IMPORTANT
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
      ${vt === "login" && "bg-[#F17235] text-white hover:bg-[#d9622d]"}
    `}
        >
          {vt === "login" ? "Log in" : "Sign up"}
        </button>
      </DialogTrigger>


      <DialogContent className="sm:max-w-106.25 bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {view === "login" ? "Welcome back" : "Create an account"}
          </DialogTitle>
        </DialogHeader>

        {view === "login" ? <LoginForm /> : <SignUpForm />}

        <div className="mt-4 text-center text-sm text-gray-500">
          {view === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <span
                className="text-[#F17235] cursor-pointer hover:underline"
                onClick={() => setView("signup")}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-[#F17235] cursor-pointer hover:underline"
                onClick={() => setView("login")}
              >
                Log in
              </span>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
