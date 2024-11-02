export interface IAiCarouselProps {
  bannerData: ISPCarousel[];
  description: string;
  
}
// export interface ISPCarouselLists {
//   value: ISPCarousel[];
// }

export interface ISPCarousel {
  Title: string;
  Description: string;
  ImageUrl?: any;
  HoverText?: string;
  Url: any;
  RedirectUrl?: any;
  OrderBy: number;
  Active: boolean;
}