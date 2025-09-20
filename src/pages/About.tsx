import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => (
  <motion.main
    className="container mx-auto py-6 sm:py-10 px-3 sm:px-6"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
  >
    <motion.h1
      className="text-2xl xs:text-3xl md:text-5xl font-bold text-orange-700 mb-4 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      About Us
    </motion.h1>
    <motion.div
      className="text-base xs:text-lg text-gray-800 max-w-3xl mx-auto space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
       <p>
        <strong>Dakshini Faliya Yuvak Mandal</strong> has been celebrating Ganesh Utsav with devotion, creativity,
        and community spirit since <strong>2001</strong>.
      </p>
      <p>
        Since <strong>2016</strong>, we have proudly created <strong>eco-friendly Ganesh idols</strong>, crafted only
        from newspaper and bamboo sticks, contributing towards a greener and more sustainable environment.
      </p>
      <p>
        Over the years, our dedication and innovation have been recognized with <strong>37 trophies and
        certificates</strong>. But our biggest reward is the love and unity of our community.
      </p>
      <p>
        During the <strong>10 days of Ganesh festival</strong>, we organize a wide range of activities:
      </p>
       <ul className="list-disc list-inside ml-4">
        <li>Drawing competitions for children</li>
        <li>Fun games for all age groups</li>
        <li>Blood donation camps to serve society</li>
      </ul>
      <p>
        We take inspiration from <strong>Lokmanya Tilak Ji</strong>, who first initiated public Ganesh Utsav to bring
        people together in unity. We also honor the legacy of <strong>Chhatrapati Shivaji Maharaj</strong> and{" "}
        <strong>Maharana Pratap</strong>, as we believe in their values of courage, leadership, and respect for culture —
        especially being rooted in Gujarat.
      </p>
      <p>
        At <strong>Dakshini Faliya Yuvak Mandal</strong>, our mission is to keep traditions alive, spread joy,
        encourage social responsibility, and bring people together as one family.
      </p>
      <p className="italic font-semibold text-orange-600">
        “With devotion in our hearts and unity in our actions, we celebrate Lord Ganesha for the betterment of society.”
      </p>
    </motion.div>
  </motion.main>
);

export default About;
        
