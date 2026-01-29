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
  open?: boolean;                  // 1. New Prop
  onOpenChange?: (open: boolean) => void; // 2. New Prop
  hideTrigger?: boolean;           // 3. New Prop
};

export const AuthenticationModel = ({ 
  vt, 
  open: externalOpen, 
  onOpenChange: externalOnOpenChange, 
  hideTrigger 
}: Props) => {
  const { isAuthenticated } = useAuth();
  const [internalOpen, setInternalOpen] = useState(false);
  const [view, setView] = useState<ViewTypes>(vt);

  // Determine if we are in "controlled" mode (controlled by parent) or "uncontrolled" mode (self-managed)
  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled && externalOnOpenChange ? externalOnOpenChange : setInternalOpen;

  useEffect(() => {
    // Close modal automatically when user becomes authenticated
    if (isAuthenticated) setOpen(false);
  }, [isAuthenticated, setOpen]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setView(vt);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* 4. Only render the default trigger button if NOT hidden */}
      {!hideTrigger && (
        <DialogTrigger asChild>
          <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
            ${vt === "login" && "bg-[#F17235] text-white hover:bg-[#d9622d]"}
            `}
          >
            {vt === "login" ? "Log in" : "Sign up"}
          </button>
        </DialogTrigger>
      )}

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