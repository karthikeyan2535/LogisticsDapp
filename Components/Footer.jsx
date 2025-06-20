import React from "react";
import { Fot1, Fot2 } from "../Components";

const Footer = () => {
  const footerNavs = [
    { href: "javascript:void(0)", name: "Terms" },
    { href: "javascript:void(0)", name: "License" },
    { href: "javascript:void(0)", name: "Privacy" },
    { href: "javascript:void(0)", name: "About" },
  ];

  return (
    <footer className="pt-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-0">
          {/* Logo and description */}
          <div className="space-y-5 max-w-md">
            <img
              src="https://www.floatui.com/logo.svg"
              className="w-32"
              alt="Logo"
            />
            <p className="text-base leading-relaxed">
              Nulla auctor metus vitae lectus iaculis, vel euismod massa efficitur.
            </p>
          </div>

          {/* Footer navigation links */}
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm sm:text-base mt-6 md:mt-0">
            {footerNavs.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  className="transition-all duration-200 font-medium hover:text-gray-500"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* App download section */}
        <div className="mt-10">
          <p className="text-gray-700 font-semibold text-base mb-3">
            Get the app
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="javascript:void(0)"
              className="inline-flex items-center gap-2 transition duration-200 hover:scale-105"
            >
              <Fot1 />
            </a>
            <a
              href="javascript:void(0)"
              className="inline-flex transition duration-200 hover:scale-105"
            >
              <Fot2 />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 py-8 border-t text-center">
          <p className="text-sm text-gray-500 tracking-wide">
            © 2024 Pakeer Karthikeyan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
