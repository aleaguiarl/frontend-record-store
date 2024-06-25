export class AlbumModel {
  albumType: string;
  id: string;
  name: string;
  artists: Artist[];
  value: number;
  images: Image[];
  releaseDate: string;
  externalUrl: ExternalUrls;
  type: string;
}

type Artist = {
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type Image = {
  height: number;
  url: string;
  width: number;
};

type ExternalUrls = {
  externalUrls: _ExternalUrls;
};

type _ExternalUrls = {
  spotify: string;
};
