import { Button } from "@/components/ui/button";
import { AlbumModel } from "@/models/albumModel";
import { album_api } from "@/services/apiService";
import { Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import React, { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  albumToShow: AlbumModel | undefined;
  isSale?: boolean;
}

export default function AlbumModal({
  open,
  onClose,
  albumToShow,
  isSale,
}: Props) {
  const [loading, setLoading] = useState(false);

  const albumData = {
    name: albumToShow?.name,
    idSpotify: albumToShow?.id,
    artistName: albumToShow?.artists[0]?.name,
    imageUrl: albumToShow?.images[0]?.url,
    value: albumToShow?.value,
  };

  const handleAlbumSale = () => {
    setLoading(true);

    album_api
      .post(`/albums/sale`, albumData)
      .then(() => {
        toast.success("Compra efetuada com sucesso!");
        setLoading(false);
        onClose();
      })
      .catch(() => {
        toast.error("Houve um erro ao fazer a compra");
        setLoading(false);
      });
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors 
      ${open ? "visible bg-black/30 backdrop-blur-sm" : "invisible"}`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-[600px] h-[300px] bg-[#FAFAFF] rounded-3xl overflow-hidden shadow shadow-black"
      >
        <button onClick={onClose} className="absolute top-2 right-2">
          <X />
        </button>
        <div
          style={
            {
              "--bg-card": `url(${albumToShow?.images[0].url})`,
            } as React.CSSProperties
          }
          className="w-1/2 h-full bg-[image:var(--bg-card)] bg-cover bg-no-repeat"
        ></div>
        <div className="flex flex-col items-center justify-between w-1/2 h-full">
          <h1 className="text-zinc-900 text-2xl font-semibold mt-5 px-10 max-h-[120px]">
            {albumToShow?.name}
          </h1>
          <article className={`flex flex-col justify-start text-left align-text-top gap-[0.10rem] pl-4 ${isSale ? "" : "pb-14"}`}>
            <div className="flex flex-wrap">
              <h2 className="font-semibold text-sm mr-2">Artista(s):</h2>
              <div>
                {albumToShow?.artists &&
                  albumToShow.artists.map((artist) => (
                    <p key={artist.id} className="text-sm">
                      {artist.name}
                    </p>
                  ))}
              </div>
            </div>
            <div className="flex flex-wrap">
              <h2 className="font-semibold text-sm mr-2">ID Spotify:</h2>
              <p className="text-sm">{albumToShow?.id}</p>
            </div>
            <div className="flex flex-wrap">
              <h2 className="font-semibold text-sm mr-2">
                Data de lançamento:
              </h2>
              <p className="text-sm">{albumToShow?.releaseDate}</p>
            </div>
            <div className="flex flex-wrap">
              <h2 className="font-semibold text-sm mr-2">Preço:</h2>
              <p className="text-sm">R$ {albumToShow?.value}</p>
            </div>
          </article>
          {isSale &&
            (loading ? (
              <Button
                disabled
                className="text-xl font-medium w-4/5 rounded-3xl mb-4 transition"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando...
              </Button>
            ) : (
              <Button
                onClick={handleAlbumSale}
                type="submit"
                className="text-xl text-white font-medium w-4/5 bg-[#faba16] hover:bg-[#faba16]/90 rounded-3xl mb-4 transition"
              >
                Comprar
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}
