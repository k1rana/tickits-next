import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import placeholder from "@/Assets/profile/poster.png";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import CardCinema from "@/components/CardCinema";
import { useRouter } from "next/router";
import { getMovieDetails } from "@/utils/https/movies";

function MovieDetails() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const [dataMovie, setDataMovie] = useState({});
  // console.log(router.query.movie_id);

  const fetching = async () => {
    const movieId = router.query.movie_id;
    try {
      const result = await getMovieDetails(movieId, controller);
      console.log(result);
      setDataMovie(result.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = [
    {
      name: "ebv.id",
      address: "Whatever street No.12, South Purwokerto",
      image: "/images/ebuid.svg",
      time: ["08:20", "09:20", "10:20", "11:20", "12:20", "13:20", "16:20"],
      price: 10,
    },
    {
      name: "CineOne21",
      address: "Downcare street  No. 21, East Purwokerto",
      image: "/images/cineone21.svg",
      time: ["08:20", "09:20", "10:20", "11:20", "12:20", "13:20", "16:20"],
      price: 10,
    },
    {
      name: "hiflix Cinema",
      address: "Colonel street No. 2, East Purwokerto",
      image: "/images/hiflix.svg",
      time: ["08:20", "09:20", "10:20", "11:20", "12:20", "13:20", "16:20"],
      price: 10,
    },
  ];

  const [location, setLocation] = useState("Jakarta");

  return (
    <Layout title={"Movie Details"}>
      <Header />
      <main className="global-px py-[3.75rem] mt-16 select-none bg-slate-300/20">
        <section className="w-full gap-6 justify-between">
          <div>
            <div className="flex flex-col md:flex-row gap-14">
              <div className="p-5 md:w-[20.75rem] border border-primary rounded-2xl relative">
                <span className="w-full h-full flex bg-slate-500">
                  <Image
                    src={dataMovie.image || placeholder}
                    alt="img-movie"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </span>
              </div>
              <div>
                <h1 className="font-bold text-2xl">
                  {dataMovie.movie_name || "Title Movie"}
                </h1>
                <p className="text-[#4E4B66] text-lg">
                  {dataMovie.genre_name || "category"}
                </p>
                <div className="mt-8">
                  <p className="text-[#8692A6] text-sm">Release date</p>
                  <p className="text-base">
                    {dataMovie.release_date || "June 28, 2017"}
                  </p>
                </div>
                <div className="mt-8">
                  <p className="text-[#8692A6] text-sm">Duration</p>
                  <p className="text-base">
                    {`${dataMovie.duration_hour} hours, ${dataMovie.duration_minute} minutes` ||
                      "2 hours 13 minutes"}
                  </p>
                </div>
                <div className="mt-8">
                  <p className="text-[#8692A6] text-sm">Directed by</p>
                  <p className="text-base">
                    {dataMovie.director || "director"}
                  </p>
                </div>
                <div className="mt-8">
                  <p className="text-[#8692A6] text-sm">Casts</p>
                  <p className="text-base">{dataMovie.aktors || "actors"}</p>
                </div>
              </div>
            </div>
            <div className="mt-14">
              <h2 className="font-semibold text-xl">Synopsis</h2>
              <p className="text-base">{dataMovie.sinopsis || "synopsis"}</p>
            </div>
          </div>
          <div className="flex flex-col items-center mt-36">
            <h1 className="text-2xl font-bold">Showtimes and Tickets</h1>
            <div className="flex items-center mt-10 gap-6">
              <div className="form-control flex-1 ">
                <input
                  type="date"
                  id="release-date"
                  name="release_date"
                  className="input input-bordered input-primary rounded w-[10rem] md:w-[16.375rem]"
                />
              </div>
              <div className="w-full flex flex-col gap-5 ">
                <div className="dropdown z-0">
                  <label
                    tabIndex={0}
                    className="btn btn-primary  w-[10rem] md:w-[16.375rem] rounded"
                  >
                    {location}
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-lg w-full"
                  >
                    <li onClick={() => setLocation("Jakarta")}>
                      <a>Jakarta</a>
                    </li>
                    <li onClick={() => setLocation("Bandung")}>
                      <a> Bandung</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-y-5 w-full mt-16">
              {data.map((datas, idx) => (
                <CardCinema
                  key={idx}
                  name={datas.name}
                  address={datas.address}
                  image={datas.image}
                  time={datas.time}
                  price={datas.price}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Layout>
  );
}

export default MovieDetails;