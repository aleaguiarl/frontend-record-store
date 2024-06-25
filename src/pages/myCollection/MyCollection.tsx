import Header from "@/components/Header";
import { AlbumModel } from "@/models/albumModel";
import { album_api } from "@/services/apiService";
import media_icon from "../../assets/media_file_icon.svg";
import dollar_icon from "../../assets/dollar_icon.svg";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyCollection() {
  const [albumCollection, setAlbumCollection] = useState<AlbumModel[]>([]);
  const [valueSpent, setValueSpent] = useState(0);

  const handleCollection = () => {
    album_api
      .get(`/albums/my-collection`)
      .then((resp) => {
        const mappedAlbums: AlbumModel[] = resp.data.map((album: any) => ({
          ...album,
          images: [
            {
              url: album.imageUrl,
            },
          ],
        }));

        setValueSpent(
          mappedAlbums.reduce((accumulator, album) => accumulator + album.value, 0)
        );
        setAlbumCollection(mappedAlbums);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    handleCollection();
  }, []);

  return (
    <main className="flex flex-col items-center min-w-screen min-h-screen w-full bg-[#19181F]">
      <Header />
      <section className="flex-col items-start w-[900px] py-10">
        <h1 className="text-white font-medium text-4xl mb-6">Meus discos</h1>
        <div className="flex gap-5">
          <div className="flex items-center bg-white rounded-xl w-[230px] h-[80px] shadow-md shadow-white/20">
            <img
              src={media_icon}
              alt="Ícone de arquivo de mídia"
              className="h-12 ml-5"
            />
            <div className="flex flex-col ml-4">
              <h2 className="text-sm font-medium">Total de albuns</h2>
              <h2 className="text-2xl font-medium">{albumCollection.length}</h2>
            </div>
          </div>
          <div className="flex items-center bg-white rounded-xl w-[230px] h-[80px] shadow-md shadow-white/20">
            <img
              src={dollar_icon}
              alt="Símbolo de dólar"
              className="h-12 ml-5"
            />
            <div className="flex flex-col ml-4">
              <h2 className="text-sm font-medium">Valor Investido</h2>
              <h2 className="text-2xl font-medium">{valueSpent.toFixed(2)}</h2>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-wrap justify-center m-2 max-w-4xl gap-8">
        {albumCollection?.map((album, i) => {
          return (
            <div
              key={i}
              style={
                {
                  "--bg-card": `url(${album.images[0].url})`,
                } as React.CSSProperties
              }
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
          );
        })}
      </div>
    </main>
  );
}
