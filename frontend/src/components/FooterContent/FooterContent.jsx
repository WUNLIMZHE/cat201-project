import React from "react";
import logo from "../../assets/logo.png";

const FooterContent = () => {
  return (
    <footer className="bg-white dark:bg-gray-200">
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
            <a href="#">
              <img src={logo} className="h-12 me-2" alt="Sunny Papyrus" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Sunny Papyrus
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/WUNLIMZHE/cat201-project"
                    target="_blank"
                    className="hover:underline fancy-hover relative"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/wunlimzhe/"
                    target="_blank"
                    className="hover:underline fancy-hover relative"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a className="hover:underline fancy-hover relative cursor-pointer">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="hover:underline fancy-hover relative cursor-pointer">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      </div>
    </footer>
  );
};

export default FooterContent;
