export interface IMovie {
  title: string;
  releasedata: Date;
  genere: Array<string>;
  cast: Array<string>;
  producer: Array<string>;
  director: string;
  Budget: number;
  collections?:number
}
