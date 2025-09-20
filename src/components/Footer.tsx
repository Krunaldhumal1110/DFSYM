
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => (
  <motion.footer
    className="bg-gradient-to-t from-orange-800 to-orange-600 text-white py-10 mt-10 shadow-inner border-t-4 border-orange-900"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7 }}
  >
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-3 sm:px-4 gap-4 md:gap-0">
      <div className="w-full md:w-auto text-center md:text-left">
        <h2 className="font-extrabold text-2xl md:text-3xl text-yellow-300 drop-shadow mb-2 tracking-wide">Dakshini Faliya Yuvak Mandal</h2>
        <ul className="mt-2 space-y-1">
          <li>Serving community since 2001</li>
          <li>Eco-friendly Ganesh idols (newspaper & bamboo since 2016)</li>
          <li>37+ awards & certificates</li>
          <li>Drawing & games competitions for all</li>
          <li>Blood donation camps during Ganesh Utsav</li>
          <li>Inspired by Tilak Ji, Shivaji Maharaj & Maharana Pratap</li>
        </ul>
        <p className="mt-4 italic text-yellow-200 text-base md:text-lg">
          “Unity, Culture & Social Service – Our Way of Celebrating Ganesh Utsav.”
        </p>
        <p className="mt-2 text-sm md:text-base text-orange-100">© {new Date().getFullYear()} Dakshini Faliya Yuvak Mandal</p>
      </div>
      <div className="flex gap-2 xs:gap-3 sm:gap-4 mt-4 md:mt-0 w-full md:w-auto justify-center md:justify-end">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 flex items-center gap-1 xs:gap-2 text-base xs:text-lg md:text-xl transition-all duration-200 bg-orange-900 bg-opacity-30 px-2 xs:px-3 sm:px-4 py-2 rounded-full shadow hover:scale-105">
          <i className="fab fa-facebook-f text-xl xs:text-2xl md:text-3xl"></i> Facebook
        </a>
        <a href="https://www.instagram.com/dfsym_2000?igsh=MTY2MDV6cmgxOGFoNg==" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 flex items-center gap-1 xs:gap-2 text-base xs:text-lg md:text-xl transition-all duration-200 bg-orange-900 bg-opacity-30 px-2 xs:px-3 sm:px-4 py-2 rounded-full shadow hover:scale-105">
          <i className="fab fa-instagram text-xl xs:text-2xl md:text-3xl"></i> Instagram
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 flex items-center gap-1 xs:gap-2 text-base xs:text-lg md:text-xl transition-all duration-200 bg-orange-900 bg-opacity-30 px-2 xs:px-3 sm:px-4 py-2 rounded-full shadow hover:scale-105">
          <i className="fab fa-youtube text-xl xs:text-2xl md:text-3xl"></i> YouTube
        </a>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
