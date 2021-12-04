import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  UserCircleIcon,
  UserIcon,
  MenuIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar, DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

function Header(props) {
  // Setting State for Search bar
  const [searchInput, setsearchInput] = useState("");
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [noOfGuests, setnoOfGuests] = useState(1);

  //ROuter is used

  const router = useRouter();

  const resetInput = () => {
    setsearchInput("");
    setendDate("");
    setstartDate("");
    setnoOfGuests(1);
  };

  const search = () => {
    resetInput();
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toString(),
        endDate: endDate.toString(),
        noOfGuests,
      },
    });
  };

  //Handle Date Change

  const handleSelect = (ranges) => {
    setstartDate(ranges.selection.startDate);
    setendDate(ranges.selection.endDate);
  };

  //Range
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* left */}
      <div
        className="relative flex items-center h-10 cursor-pointer my-auto"
        onClick={() => router.push("/")}
      >
        <Image
          src="/image.png"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle - Search */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          type="text"
          placeholder={
            props?.placeholder !== undefined
              ? props.placeholder
              : "Start your sarch"
          }
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
          className="pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      {/* Right */}
      <div className="flex space-x-4 items-center justify-end text-gray-500 ">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 " />
        <div className="flex items-center border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          {/* <Calendar date={new Date()} onChange={(e) => console.log(e)} /> */}
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              {" "}
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              type="number"
              value={noOfGuests}
              onChange={(e) => setnoOfGuests(e.target.value)}
              className=" w-12 pl-2 text-lg outline-none text-red-400"
              min={1}
            />
          </div>
          <div className="flex">
            {/* Emmet for React */}
            <button className="flex-grow text-gray-500" onClick={resetInput}>
              Cancel
            </button>
            <button
              className="flex-grow text-red-400"
              onClick={() => {
                search();
              }}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
