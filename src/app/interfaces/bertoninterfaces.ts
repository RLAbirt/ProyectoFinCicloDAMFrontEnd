export interface Ofertas {
  _id: Id;
  type: string;
  geometry: Geometry;
  properties: PropertiesOfertas;
}

export interface Hoteles {
  _id: Id;
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Restaurantes {
  _id: Id;
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface CasasRurales {
  _id: Id;
  type: string;
  geometry: Geometry;
  properties: Properties;
}


interface Geometry {
  type: string;
  coordinates: number[];
  distance: number;
}

interface Id {
  timestamp: number;
  date: string;
}

interface PropertiesOfertas {
    documentname: string;
    documentdescription: string;
    eventsearchdate1: string;
    eventsearchdate2: string;
    importance: string;
    parentcorec: string;
    marks: string;
    templatetype: string;
    eventtargetgroup: string;
    municipality: string;
    municipalitycode: string;
    territory: string;
    territorycode: string;
    country: string;
    countrycode: string;
    friendlyurl?: string;
    physicalurl: string;
    dataxml: string;
    metadataxml: string;
    zipfile: string;
  }

interface Properties {
  documentname: string;
  turismdescription: string;
  templatetype: string;
  locality?: string;
  marks: string;
  physical: string;
  visual: string;
  auditive: string;
  intellectual: string;
  organic: string;
  tourismemail: string;
  web: string;
  lodgingtype: string;
  category: string;
  signatura: string;
  capacity: string;
  municipality: string;
  municipalitycode: string;
  territory: string;
  territorycode: string;
  country: string;
  countrycode: string;
  friendlyurl: string;
  physicalurl: string;
  dataxml: string;
  metadataxml: string;
  zipfile: string;
}

export interface Restaurantes {
  _id: Id;
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface CasasRurales {
  _id: Id;
  type: string;
  geometry: Geometry;
  properties: Properties;
}
