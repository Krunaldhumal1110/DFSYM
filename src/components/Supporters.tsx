import PageHero from "./PageHero";
import { useLang } from "../i18n";

const Supporters = () => {

    const { t } = useLang();

  const supporters = [
    "Rajesh Patel",
    "Amit Shah",
    "Vijay Desai",
    "Krunal Patel",
    "Nilesh Patel"
  ];

  return (
    <>
      <PageHero title={t('ourSupporters')} />

      <main className="container mx-auto py-12 px-4">

        <h2 className="text-center text-3xl leading-relaxed font-bold">
          🙏 {t('WallOfGratitude')}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {supporters.map((name) => (
            <div
              key={name}
              className="card-premium p-6 text-center"
            >
              <div className="text-4xl mb-3">
                👤
              </div>

              <h3 className="font-semibold">
                {name}
              </h3>
            </div>
          ))}

        </div>

      </main>
    </>
  );
};

export default Supporters;