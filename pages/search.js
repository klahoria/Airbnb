import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";

function search({ searchResult }) {
  const router = useRouter();
  console.log(router.query);
  const { location, startDate, endDate, noOfGuests } = router.query;

  // console.log(format(new Date(startDate),"dd MMMM yy"))
  const formattedStartDate = new Date(startDate).toDateString();
  const formattedEndDate = new Date(endDate).toDateString();
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div /* className="h-screen" */>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6 ">
          <p className="text-xs">
            300+ Stays - {range} - for {noOfGuests} guests.
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stay in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button ">Cancellation Flexibility</p>
            <p className="button ">Type of Place</p>
            <p className="button ">Price</p>
            <p className="button ">Rooms and Beds</p>
            <p className="button ">More filters</p>
          </div>

          {searchResult &&
            searchResult?.map(
              ({ img, location, title, description, price, total, star }) => (
                <InfoCard
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  price={price}
                  total={total}
                  star={star}
                />
              )
            )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default search;

export async function getServerSideProps() {
  const searchResult = await fetch("http://links.papareact.com/isz").then(
    (result) => {
      console.log(result, "result.........");

      return result.json();
    }
  );
  return {
    props: {
      searchResult,
    },
  };
}