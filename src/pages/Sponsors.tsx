import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import sponsors from "../data/sponsors.json";
import { useLang } from "../i18n";
import { Helmet } from "react-helmet-async";
import LazyImage from "../components/ui/LazyImage";

const Sponsors = () => {
  const { t, lang } = useLang();

  return (
    <>
      <Helmet>
        <title>{t("ourSponsors")} | DFSYM</title>
        <meta
          name="description"
          content="Sponsors supporting Dakshini Faliya Sarvajanik Yuvak Mandal."
        />
      </Helmet>

      <PageHero title={t("ourSponsors")} />

      <main className="container mx-auto max-w-7xl px-4 py-12">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-maroon-800 dark:text-white mt-2 mb-4">
            🤝 {t("ourSponsors")}
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 dark:text-slate-300">
            {t("sponsorsDescription")}
          </p>
        </motion.div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          <div className="card-premium p-8 text-center">
            <h3 className="text-5xl font-bold text-maroon-700">
              {sponsors.length}
            </h3>

            <p>{t("totalSponsors")}</p>
          </div>

          <div className="card-premium p-8 text-center">
            <h3 className="text-5xl">🤝</h3>

            <p>{t("communitySupport")}</p>
          </div>

          <div className="card-premium p-8 text-center">
            <h3 className="text-5xl">🙏</h3>

            <p>{t("thankYou")}</p>
          </div>

        </div>

        {/* Sponsor Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {sponsors.map((sponsor, index) => (

            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-premium p-6 text-center hover:scale-105 transition"
            >

              <div className="h-32 flex items-center justify-center mb-5">

                <LazyImage
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-28 object-contain"
                />

              </div>

              <h3 className="text-xl font-bold text-maroon-800 dark:text-white">
                {sponsor.name}
              </h3>

              <p className="text-gold-600 font-semibold my-3">
                {sponsor.category[lang]}
              </p>

              {sponsor.website && (
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-maroon-700 hover:underline"
                >
                  Visit Website
                </a>
              )}

            </motion.div>

          ))}

        </div>

        {/* Thank You */}

        <section className="card-premium mt-16 p-10 text-center">

          <h2 className="text-3xl font-bold text-maroon-800 dark:text-white mb-5">
            🙏 {t("specialThanks")}
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 dark:text-slate-300">
            {t("sponsorsThanks")}
          </p>

        </section>

      </main>
    </>
  );
};

export default Sponsors;