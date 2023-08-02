export interface Cat {
  id: string; // 'ebv';
  url: string; // 'https:// cdn2.thecatapi.com/images/ebv.jpg';
  width: number; // 176;
  height: number; // 540;
  breeds: CatBreed[];
}

export interface CatBreed {
  adaptability: number; // 5;
  affection_level: number; // 4;
  alt_names: string; // '';
  child_friendly: number; // 4;
  country_code: string; // 'GR';
  country_codes: string; // 'GR';
  description: string; // 'Native to the Greek islands known as the Cyclades in the Aegean Sea, these are natural cats, meaning they developed without humans getting involved in their breeding. As a breed, Aegean Cats are rare, although they are numerous on their home islands. They are generally friendly toward people and can be excellent cats for families with children.';
  dog_friendly: number; // 4;
  energy_level: number; // 3;
  experimental: number; // 0;
  grooming: number; // 3;
  hairless: number; // 0;
  health_issues: number; // 1;
  hypoallergenic: number; // 0;
  id: string; // 'aege';
  image: CatImage;
  indoor: number; // 0;
  intelligence: number; // 3;
  life_span: '9 - 12';
  name: string; // 'Aegean';
  natural: number; // 0;
  origin: 'Greece';
  rare: number; // 0;
  reference_image_id: string; // 'ozEvzdVM-';
  rex: number; // 0;
  shedding_level: number; // 3;
  short_legs: number; // 0;
  social_needs: number; // 4;
  stranger_friendly: number; // 4;
  suppressed_tail: number; // 0;
  temperament: string; // 'Affectionate, Social, Intelligent, Playful, Active';
  vetstreet_url: string; // 'http:// www.vetstreet.com/cats/aegean-cat';
  vocalisation: number; // 3;
  weight: CatWeight;
  wikipedia_url: string; // 'https:// en.wikipedia.org/wiki/Aegean_cat';
}

export interface CatImage {
  id: string; // 'ZocD-pQxd';
  url: string; // 'https:// cdn2.thecatapi.com/images/ZocD-pQxd.jpg';
  width: number; // 880;
  height: number; // 1100;
}

export interface CatWeight {
  imperial: string; // '7 - 10';
  metric: string; // '3 - 5';
}
