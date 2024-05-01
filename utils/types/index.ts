export interface TypeDocumentType {
  iddocumenttype?: number;
  documenttypename: string;
}

export interface TypePerson {
  documentnumber: string;
  personname: string;
  personlastname: string;
  iddocumenttype: number;
  address?: string;
  phonenumber?:string;
  birthdate:Date;
}

export interface TypeWorkshop {
    idworkshop?: number;
    workshopname: string;
    workdescription?: string;
    idinstructor: string;
    costfirst: number;
    costsecond: number;
    costthird: number;
    workshopschedule: string;
    startsin: Date;
    endsin: Date;
    capacity: string;
    state: string;
}

export interface TypeInscription {
    idinscription?: number;
    idworkshop: number;
    idstudent: number;
    inscripciondate: Date;
	cost: number;
	state: string;
	isrequiredfirstdoc?: string;
    namefirstdoc: string;
	filefirstdoc: string;
    isrequiredseconddoc: string;
	nameseconddoc: string;
    fileseconddoc: string;
	isrequiredthirddoc: string;
	namethirddoc: string;
    filethirddoc: string;
}