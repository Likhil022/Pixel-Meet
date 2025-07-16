import React from "react";
import { Twitter, Github, Mail, MessageCircleMore } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 rounded-[0.5rem] p-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Pixel Meet</h2>
          <p className="text-sm">
            A 2D metaverse platform for interactive and fun virtual meetups.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#how-it-works" className="hover:text-white">
                How It Works
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#demo" className="hover:text-white">
                Demo
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Resources</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                GitHub
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Connect</h3>
          <p className="text-sm flex items-center gap-1">
            <Mail className="w-4 h-4" />
            <a href="mailto:support@pixelmeet.com" className="hover:text-white">
              support@pixelmeet.com
            </a>
          </p>
          <div className="flex space-x-4 mt-3 text-xl">
            <a href="#" className="hover:text-white">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white">
              <MessageCircleMore className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10">
        © 2025 Pixel Meet. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
