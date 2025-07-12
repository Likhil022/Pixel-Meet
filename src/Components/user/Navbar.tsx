import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/Components/ui/button";
const Navbar = () => {
  return (
    <div className="bg-white/40  flex justify-between px-10 h-16 align-middle py-3 text-black w-[93%] rounded-2xl mt-5 ">
      <div>
        <h1 className="text-3xl font-bold tracking-wider">Pixel Meet</h1>
      </div>
      <div className="py-1.5">
        <li className="list-none flex gap-10 text-xl font-semibold text-blue-950">
          <a href="#features">Features</a>
          <a href="#howItWorks">How It Works</a>
          <a href="#Pricing">Pricing</a>
        </li>
      </div>
      <div className=" text-lg font-medium">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="green">Login to Pixel Meet</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-1.5 border-1 border-black rounded-full p-0.5">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "custom-avatar", // Tailwind height & width
                },
              }}
            />
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
