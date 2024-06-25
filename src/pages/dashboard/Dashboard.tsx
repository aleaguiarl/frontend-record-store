import React, { FormEvent, useEffect, useState } from "react";
import { album_api } from "@/services/apiService";
import { AlbumModel } from "@/models/albumModel";
import toast from "react-hot-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Search } from "lucide-react";
import AlbumModal from "../albumModal/AlbumModal";
import Header from "@/components/Header";

export default function Dashboard() {
  const [albumsCarousel, setAlbumsCarousel] = useState<AlbumModel[]>([]);
  const [searchedAlbums, setSearchedAlbums] = useState<AlbumModel[]>([]);
  const [search, setSearch] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [albumModalOpen, setAlbumModalOpen] = useState(false);
  const [albumToSell, setAlbumToSell] = useState<AlbumModel>();

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    setSearchSubmitted(true);

    album_api
      .get(`/albums/all?searchText=${search}`)
      .then((resp) => {
        setSearchedAlbums(resp.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleSubmitAlbumSale = (album: AlbumModel) => {
    setAlbumToSell(album);
    setAlbumModalOpen(true);
  };

  useEffect(() => {
    if (!search) {
      setSearchSubmitted(false);
    }
  }, [search]);

  useEffect(() => {
    album_api
      .get("/albums/all?search=panic_at_the_disco")
      .then((resp) => {
        setAlbumsCarousel(resp.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return (
    <main className={`flex flex-col min-w-screen min-h-screen w-full bg-dashboard-background bg-cover bg-no-repeat bg-[center_-12rem] bg-fixed overflow-x-hidden ${albumModalOpen ? "fixed" : ("")}`}>
      <div className="w-full h-full backdrop-brightness-50">
        <Header/>
        <section className="flex items-center w-full h-[220px] pl-10">
          <div className="flex flex-col items-start max-w-[500px]">
            <p className="text-3xl text-white font-semibold text-shadow shadow-black/80">
              A história da música não pode ser esquecida!
            </p>
            <p className="text-xl text-white font-normal text-shadow shadow-black/80">
              Sucessos que maracaram o tempo!
            </p>
          </div>
        </section>
        <div className="bg-gradient-to-t from-[#19181F] w-full h-14"></div>
        <section className="flex flex-col items-center justify-start w-full h-full min-h-[calc(100vh-340px)] py-5 gap-y-2 bg-[#19181F]">
          <form
            onSubmit={handleSearch}
            className="flex justify-center items-center w-full max-w-[400px] px-4 sm:px-0"
          >
            <div className="flex justify-center items-center w-full ring-1 ring-zinc-400 rounded-xl">
              <input
                onChange={(event) => setSearch(event.target.value)}
                type="text"
                placeholder="Buscar album..."
                className="flex bg-transparent max-w-lg text-white border-none h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button type="submit" aria-label="Buscar" className="pr-3">
                <Search
                  strokeWidth="1"
                  color="rgb(161 161 170)"
                  className="ml-4"
                />
              </button>
            </div>
          </form>
          {searchSubmitted ? (
            <div className="flex flex-wrap justify-center m-2 max-w-4xl gap-8">
              {searchedAlbums?.map((album, i) => (
                <div
                  key={i}
                  style={
                    {
                      "--bg-card": `url(${album.images[0].url})`,
                    } as React.CSSProperties
                  }
                  onClick={() => handleSubmitAlbumSale(album)}
                  className="bg-[image:var(--bg-card)] bg-cover bg-no-repeat w-[200px] h-[200px] cursor-pointer rounded-md shadow-lg shadow-white/20 hover:transform hover:scale-105"
                >
                  <div className="flex h-full w-full items-center justify-center backdrop-brightness-[0.8]">
                    <h1 className="text-xl font-semibold uppercase text-white p-2 text-shadow shadow-black/80">
                      {album.name}
                    </h1>
                    <div className="absolute bottom-2 right-2 flex justify-end items-end">
                      <h2 className="text-xl font-semibold uppercase text-white text-shadow shadow-black/80">
                        R$ {album.value}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="w-full text-white text-left text-2xl font-semibold mx-8 mb-3 text-shadow shadow-black">
                Trends
              </span>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
                className="w-screen lg:max-w-[900px]"
              >
                <CarouselContent>
                  {albumsCarousel?.map((album, i) => (
                    <CarouselItem key={i} className="md:basis-1/3 xl:basis-1/4">
                      <div
                        key={i}
                        style={
                          {
                            "--bg-card": `url(${album.images[0].url})`,
                          } as React.CSSProperties
                        }
                        onClick={() => handleSubmitAlbumSale(album)}
                        className="bg-[image:var(--bg-card)] bg-cover bg-no-repeat w-[200px] h-[200px] cursor-pointer rounded-md shadow-lg shadow-white/20 hover:transform hover:scale-105"
                      >
                        <div className="flex h-full w-full items-center justify-center backdrop-brightness-[0.8]">
                          <h1 className="text-xl font-semibold uppercase text-white p-2 text-shadow shadow-black/80">
                            {album.name}
                          </h1>
                          <div className="absolute bottom-2 right-3 flex justify-end items-end">
                            <h2 className="text-xl font-semibold uppercase text-white text-shadow shadow-black/80">
                              R$ {album.value}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}
        </section>
      </div>
      <AlbumModal
        open={albumModalOpen}
        onClose={() => setAlbumModalOpen(false)}
        albumToShow={albumToSell}
        isSale={true}
      />
    </main>
  );
}
