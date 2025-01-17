import React from 'react'
import logo from "../../assets/logo.png";

const FooterContent = () => {
  return (
    <footer class="bg-white dark:bg-gray-200">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
              <a>
                  <img src={logo} class="h-12 me-2" alt="Sunny Papyrus" />
                  <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Sunny Papyrus</span>
              </a>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                          <a href="https://github.com/WUNLIMZHE/cat201-project" class="hover:underline fancy-hover relative">Github</a>
                      </li>
                      <li>
                          <a href="https://www.linkedin.com/in/wunlimzhe/" class="hover:underline fancy-hover relative">LinkedIn</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                          <a href="#" class="hover:underline fancy-hover relative">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" class="hover:underline fancy-hover relative">Terms &amp; Conditions</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    </div>
</footer>
  )
}

export default FooterContent