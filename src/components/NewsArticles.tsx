import { motion } from "framer-motion";
import PageHero from "./PageHero";
import mediaCoverage from "../data/NewsArticles.json";
import { useLang } from "../i18n";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import LazyImage from "./ui/LazyImage";

const NewsArticles = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const { t, lang } = useLang();


    const totalImages = mediaCoverage.reduce(
        (sum, year) => sum + year.images.length,
        0
    );

    const allChannels = [
        ...new Set(mediaCoverage.flatMap(item => item.channels))
    ];

    const allNewspapers = [
        ...new Set(mediaCoverage.flatMap(item => item.newspapers))
    ];

    return (
        <>
        <Helmet>
      <title>News & Media Coverage | DFSYM</title>
      <meta
        name="description"
        content="Newspaper articles, TV coverage and media recognition received by DFSYM Ganesh Mandal."
      />
    </Helmet>

            <PageHero title={t('newsAndMediaCoverage')} />

            <main className="container mx-auto py-10 px-4">

                {/* Statistics Section */}

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">

                    {/* <div className="card-premium p-6 text-center">
                        <h3 className="text-4xl font-bold text-maroon-700">
                            {totalImages}+
                        </h3>
                        <p>{t('publishedArticles')}</p>
                    </div> */}

                    <div className="card-premium p-10 text-center">
                        <h3 className="text-4xl font-bold text-maroon-700">
                            {allChannels.length}+
                        </h3>
                        <p>{t('mediaChannels')}</p>
                    </div>

                    <div className="card-premium p-10 text-center">
                        <h3 className="text-4xl font-bold text-maroon-700">
                            {/* {allNewspapers.length}+ */}
                            {totalImages}+
                        </h3>
                        <p>{t('newspapers')}</p>
                    </div>

                </section>

                {/* Year Wise Coverage */}

                {mediaCoverage.map((item, index) => (
                    <motion.section
                        key={item.year}
                        className="mb-16"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex items-center gap-4 mb-6">

                            <div className="w-12 h-12 rounded-full bg-maroon-700 text-white flex items-center justify-center font-bold">
                                {item.year}
                            </div>

                            <h2 className="text-3xl leading-relaxed font-bold text-maroon-800">
                                {item.title?.[lang]}
                            </h2>


                        </div>

                        {/* Newspaper Images */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                            {item.images.map((img, imgIndex) => (
                                <div
                                    key={imgIndex}
                                    className="card-premium overflow-hidden cursor-pointer"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <LazyImage
                                        src={img}
                                        alt={`Media Coverage ${item.year}`}
                                        className="w-full h-[500px] object-contain bg-white" />
                                </div>
                            ))}

                        </div>

                        {/* Newspapers */}

                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-3">
                                {t('featuredIn')}
                            </h3>

                            <div className="flex flex-wrap gap-3">
                                {item.newspapers.map((paper, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 rounded-full bg-gold-100 text-maroon-800"
                                    >
                                        {paper}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Channels */}

                        <div>
                            <h3 className="font-bold text-lg mb-3">
                                {t('televisionCoverage')}
                            </h3>

                            <div className="flex flex-wrap gap-3">
                                {item.channels.map((channel, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 rounded-full bg-maroon-100 text-maroon-800"
                                    >
                                        {channel}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </motion.section>
                ))}

                {/* Media Partners */}

                <section className="card-premium p-8 mb-14">

                    <h2 className="text-3xl font-bold text-center mb-8">
                        {t('mediaPartners')}
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                        {allNewspapers.map((paper, index) => (
                            <div
                                key={index}
                                className="border rounded-xl p-4 text-center font-semibold"
                            >
                                {paper}
                            </div>
                        ))}

                    </div>

                </section>

                {/* TV Channels */}

                <section className="card-premium p-8 mb-14">

                    <h2 className="text-3xl font-bold text-center mb-8">
                        {t('televisionCoverage')}
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                        {allChannels.map((channel, index) => (
                            <div
                                key={index}
                                className="border rounded-xl p-4 text-center font-semibold"
                            >
                                {channel}
                            </div>
                        ))}

                    </div>

                </section>

                {/* Thank You */}

                <section className="card-premium p-10 text-center">

                    <h2 className="text-3xl font-bold text-maroon-800 mb-4">
                        🙏  {t("mediaThanksTitle")}
                    </h2>

                    <p className="text-gray-700 max-w-3xl mx-auto">
                        {t("mediaThanksDesc")}
                    </p>

                </section>

            </main>

            {/* Modal */}

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <LazyImage
                        src={selectedImage}
                        alt=""
                        className="max-h-[90vh] max-w-[95vw] object-contain"
                    />
                </div>
            )}
        </>
    );
};

export default NewsArticles;