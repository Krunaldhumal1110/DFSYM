import { useParams } from "react-router-dom";
import { useState } from "react";
import PageHero from "../components/PageHero";
import activityDetails from "../data/activityDetails.json";
import { useLang } from "../i18n";

interface ActivityYear {
  year: number;
  Donors?: number;
  images: string[];
}

interface Activity {
  id: string;
  title: {
    en: string;
    hi: string;
    mr: string;
    gu: string;
  };
  description: {
    en: string;
    hi: string;
    mr: string;
    gu: string;
  };
  banner: string;
  totalDonors?: number;
  years: ActivityYear[];
}

const ActivityDetails = () => {
  const { id } = useParams();
  const { lang } = useLang();

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const activities = activityDetails as Activity[];

  const activity = activities.find(
    (item) => item.id === id
  );

  if (!activity) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold">
          Activity Not Found
        </h2>
      </div>
    );
  }

  return (
    <>
      <PageHero title={activity.title[lang]} />

      <main className="container mx-auto px-4 py-10">

        {/* Banner */}
       <div className="bg-white dark:bg-slate-900 rounded-3xl p-3 shadow-lg mb-8">
  <img
    src={activity.banner}
    alt={activity.title[lang]}
    className="w-full max-h-[500px] object-contain mx-auto rounded-2xl"
  />
</div>
        {/* Total Donors (Only Blood Donation Page) */}
        {activity.totalDonors && (
          <div className="card-premium p-6 mb-8 text-center">
            <h3 className="text-4xl font-bold text-red-700">
              {activity.totalDonors}+
            </h3>

            <p className="text-lg font-medium">
              🩸 Total Blood Donors
            </p>
          </div>
        )}

        {/* Description */}
        <div className="card-premium p-6 mb-10">
          <p className="text-lg leading-relaxed">
            {activity.description[lang]}
          </p>
        </div>

        {/* Year Wise Gallery */}
        {activity.years.map((yearData, yearIndex) => (
          <section
            key={yearIndex}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-5">

              <h2 className="text-2xl font-bold text-maroon-800">
                📅 {yearData.year}
              </h2>

              {yearData.Donors && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
                  🩸 Donors : {yearData.Donors}
                </div>
              )}
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {yearData.images.map((img, index) => (
                <div
                  key={index}
                  className="break-inside-avoid overflow-hidden rounded-2xl shadow-lg cursor-pointer mb-6"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`${activity.title[lang]} ${yearData.year}`}
                    className="w-full h-auto hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
          onClick={() =>
            setSelectedImage(null)
          }
        >
          <img
            src={selectedImage}
            alt=""
            className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl"
          />
        </div>
      )}
    </>
  );
};

export default ActivityDetails;