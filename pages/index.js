import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>PAPA Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}

      <Header />
      {/* Banner */}

      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16 ">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/* Pull some data from a server - API endPoints */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item) => (
              // <h1>{item.location}</h1>
              <SmallCard
                key={item.img}
                img={item.img}
                distance={item.distance}
                location={item.location}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -m-3">
            {cardsData && console.log(cardsData)}
            {cardsData?.map((item) => {
              return (
                <MediumCard key={item.img} img={item.img} title={item.title} />
              );
            })}
          </div>
        </section>

        <LargeCard
          img="/shutterstock.jpg"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb."
          buttonText="Get Inspired"
        />
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => {
      return res.json();
    }
  );
  const cardsData = await fetch("https://links.papareact.com/zp1").then(
    (item) => {
      return item.json();
    }
  );
  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
