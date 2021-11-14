export class OfertaProperties {
    documentname:        string;
    documentdescription: string;
    eventsearchdate1:    string;
    eventsearchdate2:    string;
    importance:          string;
    parentcorec:         string;
    marks:               string;
    templatetype:        string;
    eventtargetgroup:    string;
    municipality:        string;
    municipalitycode:    string;
    territory:           string;
    territorycode:       string;
    country:             string;
    countrycode:         string;
    friendlyurl:         string;
    physicalurl:         string;
    dataxml:             string;
    metadataxml:         string;
    zipfile:             string;

    constructor(documentname:string, documentdescription:string, eventsearchdate1:string, eventsearchdate2:string,
                importance:string, parentcorec:string, marks:string, templatetype:string, eventtargetgroup:string,
                municipality:string, municipalitycode:string, territory:string, territorycode:string, country:string,
                countrycode:string, friendlyurl:string, physicalurl:string, dataxml:string, metadataxml:string,
                zipfile:string) {
        
                    this.documentname = documentname;
                    this.documentdescription = documentdescription;
                    this.eventsearchdate1 = eventsearchdate1;
                    this.eventsearchdate2 = eventsearchdate2;
                    this.importance = importance;
                    this.parentcorec = parentcorec;
                    this.marks = marks;
                    this.templatetype = templatetype;
                    this.eventtargetgroup = eventtargetgroup;
                    this.municipality = municipality;
                    this.municipalitycode = municipalitycode;
                    this.territory = territory;
                    this.territorycode = territorycode;
                    this.country = country;
                    this.countrycode = countrycode;
                    this.friendlyurl = friendlyurl;
                    this.physicalurl = physicalurl;
                    this.dataxml = dataxml;
                    this.metadataxml = metadataxml;
                    this.zipfile = zipfile;
    }
}