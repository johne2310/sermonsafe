export interface SermonSeries {
  key$?: string;
  series?: string;
  category?: string;

  sermon: Sermons[];
}

export interface Sermons {
  sermonId: string;
  series?: string;
  title?: string;
  description?: string;
  date?: Date;
  category?: string;
  locationId?: any; //Locations[];
  reference?: any; //BibleVerses[];
}

// export interface Locations {
//   key$?: string;
//   date?: Date;
//   location?: string;
// }

export interface BibleVerses {
  key$?: string;
  book?: string;
  chapterFrom?: number;
  verseFrom?: number;
  chapterTo?: number;
  verseTo?: number;
}

export interface Locations {
  locationId: string;
  sermonId: string;
  locationName: string;
  date: Date;
}
