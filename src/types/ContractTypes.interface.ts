export interface Contract {
    versions: Version[];
    name: string;
    creator: string;
}

export interface Version {
    versionNumber: number;
    parties: Party[];
    deontics: Deontic[];
    actions: Action[];
    ipObjects: IPObject[];
    signedBy: string[];
    requiredSignatures: string[];
    status: string;
    created: Date;
}

export interface Party {
    class: string;
    role: string;
    identifier: string;
    metadata: Metadata;
    deonticsIssued: string[];
    actionsIsSubject: string[];
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

export interface VersionSummary {
    date: string;
    versionNumber: number;
}