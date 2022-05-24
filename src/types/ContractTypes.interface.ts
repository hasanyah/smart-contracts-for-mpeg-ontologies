export interface Contract {
    versions: Version[];
    name: string;
}

export interface Version {
    versionNumber: number;
    parties: Party[];
    deontics: Deontic[];
    actions: Action[];
    ipObjects: IPObject[];
    signedBy: number[];
    status: string;
    created: Date;
}

export interface Party {
    class: string;
    role: string;
    identifier: string;
    metadata: Metadata;
    deonticsIssued: number[];
    actionsIsSubject: number[];
}

export interface Deontic {
    class: string;
    role: string;
    identifier: string;
    metadata: Metadata;
    issuedIn: string;
    issuer: number;
    act: number;
    actedBySubject: number;
    actObjects: IPObject[];
}

export interface Action {
    class: string;
    type: string;
    identifier: string;
    actedBy: number;
    actedOver: number[];
    beneficiaries: number[];
}

export interface IPObject {
    class: string;
    type: string;
    identifier: string;
    metadata: Metadata;
}

export interface Metadata {
    "rdfs:label": String;
}