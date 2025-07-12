import { RedirectToSignIn, SignedOut } from "@clerk/clerk-react";
import React from "react";

const dbNavbar = () => {
  return (
    <div>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
};

export default dbNavbar;
