import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';

const Footer: React.FC = () => {
  const { t } = useLang();

  return (
    <motion.footer
      className="bg-gradient-to-b from-maroon-900 to-sacred-dark text-gold-100 py-10 sm:py-12 mt-12 border-t border-gold-500/25"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="w-full lg:max-w-md">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-gradient-gold mb-3">
              {t('orgName')}
            </h2>
            <ul className="space-y-2 text-sm sm:text-base text-gold-200/80">
              <li>{t('since2000')} · Vadodara, Gujarat</li>
              <li>{t('ecoSince2016')}</li>
              <li>{t('memberMade')}</li>
            </ul>
            <p className="mt-4 italic text-gold-300/90 text-sm sm:text-base border-l-2 border-gold-500/50 pl-4">
              {t('footerTagline')}
            </p>
            <p className="mt-4 text-xs text-gold-400/60">
              © {new Date().getFullYear()} Dakshini Faliya Sarvajanik Yuvak Mandal
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {['/history', '/celebrations', '/guests'].map((path) => (
                <Link
                  key={path}
                  to={path}
                  className="text-gold-300 hover:text-gold-100 transition underline-offset-4 hover:underline"
                >
                  {t(path.slice(1) as 'history' | 'celebrations' | 'guests')}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            {[
              { href: 'https://www.instagram.com/dfsym_2000?igsh=MTY2MDV6cmgxOGFoNg==', icon: 'fab fa-instagram', label: 'Instagram' },
              { href: 'https://facebook.com', icon: 'fab fa-facebook-f', label: 'Facebook' },
              { href: 'https://youtube.com', icon: 'fab fa-youtube', label: 'YouTube' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm bg-maroon-800/60 border border-gold-500/25 px-4 py-2.5 rounded-full hover:bg-gold-500/20 hover:border-gold-400/50 hover:scale-[1.02] transition-all duration-300"
              >
                <i className={`${social.icon} text-gold-400`} />
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
