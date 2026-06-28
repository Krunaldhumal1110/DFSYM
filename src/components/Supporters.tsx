import  { useMemo, useState } from "react";
import PageHero from "./PageHero";
import supporters from "../data/supporters.json";
import { useLang } from "../i18n";

interface Person {
  id: number;
  name: string;
}
interface MemoryPerson {
  id: number;
  name: string;
  photo: string;
}

interface SupportersData {
  male: Person[];
  female: Person[];
  kids: Person[];
  memory: MemoryPerson[];
}


const Supporters = () => {
  const { t } = useLang();

  const [search, setSearch] = useState("");

  const data = supporters as SupportersData;

  const filterPeople = (people: Person[]) =>
    people.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );


  const male = useMemo(() => filterPeople(data.male), [search]);
  const female = useMemo(() => filterPeople(data.female), [search]);
  const kids = useMemo(() => filterPeople(data.kids), [search]);

  const memory = useMemo(
    () =>
      data.memory.filter((person) =>
        person.name
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  const totalSupporters =
    data.male.length +
    data.female.length +
    data.kids.length;

  const Section = ({
    title,
    emoji,
    people,
  }: {
    title: string;
    emoji: string;
    people: Person[];
  }) => (
    <section className="mb-16">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gold-500 to-maroon-700 flex items-center justify-center text-white text-xl">

          {emoji}

        </div>

        <h2 className="text-3xl font-bold text-maroon-800">
          {title}
        </h2>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

        {people.map((person) => (

          <div
            key={person.id}
            className="card-premium p-5 text-center hover:-translate-y-1 hover:shadow-xl transition duration-300"
          >

            <div className="w-16 h-16 rounded-full bg-maroon-100 flex items-center justify-center text-3xl mx-auto mb-4">

              {emoji}

            </div>

            <h3 className="font-semibold text-maroon-800">

              {person.name}

            </h3>

          </div>

        ))}

      </div>

      {people.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No supporters found.
        </p>
      )}

    </section>
  );

  return (
    <>
      <PageHero title={t("ourSupporters")} />

      <main className="container mx-auto max-w-7xl px-4 py-12">

        {/* Header */}

        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 bg-gold-500 text-maroon-900 px-5 py-2 rounded-full font-bold shadow-lg">

            🙏 {t("WallOfGratitude")}

          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-maroon-800 mt-5">

            {t("ourSupporters")}

          </h1>

          <p className="max-w-3xl mx-auto mt-4 text-gray-600">

            {t("supportersDescription")}

          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          <div className="card-premium p-6 text-center">

            <div className="text-5xl mb-3">🤝</div>

            <h3 className="text-4xl font-bold text-maroon-700">

              {totalSupporters}

            </h3>

            <p>{t("totalSupporters")}</p>

          </div>

          <div className="card-premium p-6 text-center">

            <div className="text-5xl mb-3">👨</div>

            <h3 className="text-4xl font-bold text-maroon-700">

              {data.male.length}

            </h3>

            <p>{t("maleSupporters")}</p>


          </div>

          <div className="card-premium p-6 text-center">

            <div className="text-5xl mb-3">👩</div>

            <h3 className="text-4xl font-bold text-maroon-700">

              {data.female.length}

            </h3>

            <p>{t("femaleSupporters")}</p>

          </div>

          <div className="card-premium p-6 text-center">

            <div className="text-5xl mb-3">👧</div>

            <h3 className="text-4xl font-bold text-maroon-700">

              {data.kids.length}

            </h3>

            <p>{t("kidsSupporters")}</p>

          </div>

        </div>

        {/* Search */}

        <div className="max-w-xl mx-auto mb-14">

          <input
            type="text"
            placeholder={t("searchSupporters")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-5 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-maroon-600"
          />

        </div>

        {/* Sections */}

        <section className="mt-20 mb-20">

          <div className="text-center mb-10">

            <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-slate-800 px-6 py-2 rounded-full">
              🕊️
              <span className="font-semibold">
                {t("memoryTitle")}
              </span>
            </div>

            <h2 className="text-4xl font-bold mt-5 text-maroon-800 dark:text-white">
              {t("memoryHeading")}
            </h2>

            <p className="max-w-3xl mx-auto mt-4 text-gray-600 dark:text-slate-300 leading-relaxed">
              {t("memoryDescription")}
            </p>

          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {memory.map((person) => (

              <div
                key={person.id}
                className="card-premium p-6 text-center"
              >

                <img
                  src={person.photo}
                  alt={person.name}
                  className="w-36 h-36 rounded-full object-cover mx-auto border-4 border-gold-400 shadow-lg"
                />

                <h3 className="mt-5 text-xl font-bold text-maroon-800 dark:text-white">

                  {person.name}

                </h3>

                <p className="mt-2 text-sm italic text-gray-500 dark:text-slate-400">
                  {t("foreverInHearts")}
                </p>

              </div>

            ))}

          </div>

        </section>

        <Section
          title={t("maleSupporters")}
          emoji="👨"
          people={male}
        />

        <Section
          title={t("femaleSupporters")}
          emoji="👩"
          people={female}
        />

        <Section
          title={t("kidsSupporters")}
          emoji="👧"
          people={kids}
        />



        {/* Footer */}

        <section className="card-premium p-10 text-center mt-10">

          <h2 className="text-3xl font-bold text-maroon-800 mb-5">

            🙏 {t("thankYouSupporters")}

          </h2>

          <p className="text-gray-700 max-w-3xl mx-auto">

            {t("supportersThanks")}

          </p>

        </section>

      </main>
    </>
  );
};

export default Supporters;