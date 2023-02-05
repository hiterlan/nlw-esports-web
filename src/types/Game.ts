export interface Game {
  id: string;
  title: string;
  bannerURL: string;
  _count: {
    Ad: number;
  };
}

export interface GameOption {
  id: string;
  title: string;
}
