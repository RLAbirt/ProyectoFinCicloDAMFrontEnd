export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Properties {
    documentname: string;
    turismdescription: string;
    templatetype: string;
    locality: string;
    marks: string;
    physical: string;
    visual: string;
    auditive: string;
    intellectual: string;
    organic: string;
    web: string;
    capacity: string;
    restorationtype: string;
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

export interface Establecimiento {
    id: number;
    type: string;
    geometry: Geometry;
    properties: Properties;
}