import React from "react";

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
      <div className=" text-lg my-auto font-medium">
        <button className="border-1 border-amber-100 px-2 py-1.5 rounded-xl bg-[#06d6a0]">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Navbar;
