"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import useRentModal from "~/app/hooks/useRentModal";

import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import toast from "react-hot-toast";
import SignInWrapper from "../SignInWrapper";
import SignUpWrapper from "../SignUpWrapper";

const UserMenu = () => {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const rentModal = useRentModal();
  const onRent = useCallback(() => {
    rentModal.onOpen();
  }, [rentModal]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <SignedIn>
          <div
            onClick={onRent}
            className=" cursor-pointer rounded-full px-4
            py-3 text-sm font-semibold transition hover:bg-neutral-100"
          >
            List your property
          </div>
        </SignedIn>
        <SignedOut>
          <SignInWrapper>
            <div
              onClick={() =>
                toast.error("Please sign in to list your property")
              }
              className=" cursor-pointer rounded-full px-4
            py-3 text-sm font-semibold transition hover:bg-neutral-100"
            >
              List your property
            </div>
          </SignInWrapper>
        </SignedOut>
        <div
          className="flex cursor-pointer items-center gap-3 rounded-full 
            border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <nav
          className="absolute right-0 top-12
            w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4"
        >
          <SignedIn>
            <SignOutButton>
              <div
                className="cursor-pointer px-4 py-3 font-semibold transition
                  hover:bg-neutral-100"
              >
                Sign out
              </div>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <div
              className="flex cursor-pointer flex-col px-4 py-3
              font-semibold transition "
            >
              <SignInWrapper>
                <div
                  className="cursor-pointer px-4 py-3 font-semibold transition
                  hover:bg-neutral-100"
                >
                  Sign in
                </div>
              </SignInWrapper>
              <SignUpWrapper>
                <div
                  className="cursor-pointer px-4 py-3 font-semibold transition
                hover:bg-neutral-100"
                >
                  Sign up
                </div>
              </SignUpWrapper>
            </div>
          </SignedOut>
        </nav>
      )}
    </div>
  );
};

export default UserMenu;
