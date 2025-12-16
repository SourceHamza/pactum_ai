import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export default function LandingPage() {
  return (
    <div className="bg-[#141414] min-h-screen text-white flex justify-center items-center">
    {/* <BackgroundRippleEffect /> */}
      <main className="container mx-auto px-6"> 
        <div className="grid lg:grid-cols-2 gap-12 items-center">       
          {/* Left Content */}
          <div className="space-y-6">
            <Image
              src="/Frame 3.svg"
              alt="Contract Validation Illustration"
              width={100}
              height={100}
              objectFit="contain"
            />
            <h1 className="text-5xl font-bold tracking-tight">
              THE SMARTER WAY TO DO CONTRACTS!
            </h1>
            <p className="text-lg text-gray-400 max-w-lg">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa.
            </p>
            <div className="flex items-center gap-4">
              <SignUpButton mode="modal">
                <Button className="bg-white text-black hover:bg-gray-200 font-medium px-8 py-3">
                  Sign up
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-white hover:bg-white/10 font-medium px-8 py-3">
                  Login
                </Button>
              </SignInButton>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="ml-36">
            <Image
              src="/right.png"
              alt="Contract Validation Illustration"
              width={450}
              height={450}
              objectFit="contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
}


