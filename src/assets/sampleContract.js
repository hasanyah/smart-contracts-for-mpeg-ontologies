const sampleContract = {
    "parties": {
    "http://mpeg.org/PerformingRighthsOrganisation": {
        "class": "Party",
        "identifier": "http://mpeg.org/PerformingRighthsOrganisation",
        "metadata": {
        "rdfs:label": "PERFORMING RIGHTS ORGANISATION"
        }
    },
    "http://mpeg.org/Aggregator": {
        "class": "Distributor",
        "role": "Distributor",
        "identifier": "http://mpeg.org/Aggregator",
        "metadata": {
        "rdfs:label": "AGGREGATOR"
        },
        "deonticsIssued": [
        "http://mpeg.org/permission3"
        ],
        "actionsIsSubject": [
        "http://mpeg.org/pay5",
        "http://mpeg.org/action6"
        ]
    },
    "http://mpeg.org/Author": {
        "class": "Creator",
        "role": "Creator",
        "identifier": "http://mpeg.org/Author",
        "metadata": {
        "rdfs:label": "AUTHOR/BAND"
        },
        "deonticsIssued": [
        "http://mpeg.org/permission4"
        ]
    },
    "http://mpeg.org/Publisher": {
        "class": "Distributor",
        "role": "Distributor",
        "identifier": "http://mpeg.org/Publisher",
        "metadata": {
        "rdfs:label": "PUBLISHER"
        },
        "deonticsIssued": [
        "http://mpeg.org/permission2",
        "http://mpeg.org/obligation1"
        ],
        "actionsIsSubject": [
        "http://mpeg.org/action5"
        ]
    },
    "http://mpeg.org/MechanicalLicenseAgent": {
        "class": "Party",
        "identifier": "http://mpeg.org/MechanicalLicenseAgent",
        "metadata": {
        "rdfs:label": "MECHANICAL LICENSE AGENT"
        },
        "actionsIsSubject": [
        "http://mpeg.org/pay7"
        ]
    },
    "http://mpeg.org/RecordLabel": {
        "class": "Distributor",
        "role": "Distributor",
        "identifier": "http://mpeg.org/RecordLabel",
        "metadata": {
        "rdfs:label": "INDIE LABEL"
        },
        "deonticsIssued": [
        "http://mpeg.org/obligation2",
        "http://mpeg.org/permission6"
        ],
        "actionsIsSubject": [
        "http://mpeg.org/action3",
        "http://mpeg.org/pay6",
        "http://mpeg.org/action4"
        ]
    },
    "http://mpeg.org/StreamingService": {
        "class": "Distributor",
        "role": "Distributor",
        "identifier": "http://mpeg.org/StreamingService",
        "metadata": {
        "rdfs:label": "STREAMING SERVICE"
        },
        "deonticsIssued": [
        "http://mpeg.org/obligation8",
        "http://mpeg.org/permission1",
        "http://mpeg.org/obligation7",
        "http://mpeg.org/obligation6",
        "http://mpeg.org/obligation5",
        "http://mpeg.org/obligation4",
        "http://mpeg.org/obligation9"
        ],
        "actionsIsSubject": [
        "http://mpeg.org/action2",
        "http://mpeg.org/pay4",
        "http://mpeg.org/pay3",
        "http://mpeg.org/pay2"
        ]
    },
    "http://mpeg.org/Consumer": {
        "class": "EndUser",
        "role": "EndUser",
        "identifier": "http://mpeg.org/Consumer",
        "metadata": {
        "rdfs:label": "CONSUMER"
        },
        "actionsIsSubject": [
        "http://mpeg.org/action1",
        "http://mpeg.org/pay1"
        ],
        "deonticsIssued": [
        "http://mpeg.org/obligation3"
        ]
    }},
    "deontics": {
    "http://mpeg.org/obligation2": {
        "class": "Obligation",
        "type": "Obligation",
        "identifier": "http://mpeg.org/obligation2",
        "metadata": {
        "rdfs:label": "Indie label provide a song to publisher"
        },
        "issuedIn": "http://mpeg.org/contract2",
        "issuer": "http://mpeg.org/RecordLabel",
        "act": "http://mpeg.org/action3",
        "actedBySubject": "http://mpeg.org/RecordLabel",
        "actObjects": [
        "http://mpeg.org/Song"
        ]
    },
    "http://mpeg.org/obligation8": {
        "class": "Obligation",
        "type": "Obligation",
        "identifier": "http://mpeg.org/obligation8",
        "metadata": {
        "rdfs:label": "Indie label must pay 10-50% to Author"
        },
        "issuedIn": "http://mpeg.org/contract2",
        "issuer": "http://mpeg.org/StreamingService",
        "act": "http://mpeg.org/pay6",
        "actedBySubject": "http://mpeg.org/RecordLabel"
    },
    "http://mpeg.org/permission1": {
        "class": "MCOPermission",
        "type": "MCOPermission",
        "identifier": "http://mpeg.org/permission1",
        "metadata": {
        "rdfs:label": "Consumer can play a song"
        },
        "issuedIn": "http://mpeg.org/contract2",
        "issuer": "http://mpeg.org/StreamingService",
        "act": "http://mpeg.org/action1",
        "actedBySubject": "http://mpeg.org/Consumer",
        "actObjects": [
        "http://mpeg.org/Song"
        ]
    },
    "http://mpeg.org/permission2": {
        "class": "MCOPermission",
        "type": "MCOPermission",
        "identifier": "http://mpeg.org/permission2",
        "metadata": {
        "rdfs:label": "Publisher authorises streaming service"
        },
        "issuedIn": "http://mpeg.org/contract2",
        "issuer": "http://mpeg.org/Publisher",
        "act": "http://mpeg.org/action2",
        "actedBySubject": "http://mpeg.org/StreamingService",
        "actObjects": [
        "http://mpeg.org/Song"
        ]
    },
    "http://mpeg.org/permission3": {
        "class": "MCOPermission",
        "type": "MCOPermission",
        "identifier": "http://mpeg.org/permission3",
        "metadata": {
        "rdfs:label": "Record label authorises streaming service"
        },
        "issuedIn": "http://mpeg.org/contract2",
        "issuer": "http://mpeg.org/Aggregator",
        "act": "http://mpeg.org/action2",
        "actedBySubject": "http://mpeg.org/StreamingService",
        "actObjects": [
        "http://mpeg.org/Song"
        ]
    },
    "http://mpeg.org/obligation1": {
        "class": "Obligation",
        "type": "Obligation",
        "identifier": "http://mpeg.org/obligation1",
        "metadata": {
        "rdfs:label": "Publisher provide a song to streaming"
        },
        "issuedIn": "http://mpeg.org/contract2",
        "issuer": "http://mpeg.org/Publisher",
        "act": "http://mpeg.org/action5",
        "actedBySubject": "http://mpeg.org/Publisher",
        "actObjects": [
        "http://mpeg.org/Song"
        ]
    },
    "http://mpeg.org/obligation7": {
        "class": "Obligation",
        "type": "Obligation",
        "identifier": "http://mpeg.org/obligation7",
        "metadata": {
        "rdfs:label": "Aggregator must pay 85% to Record Label"
        },
        "issuedIn": "http://mpeg.org/contract2",
        "issuer": "http://mpeg.org/StreamingService",
        "act": "http://mpeg.org/pay5",
        "actedBySubject": "http://mpeg.org/Aggregator"
    },
    "http://mpeg.org/permission6": {
        "class": "MCOPermission",
        "type": "MCOPermission",
        "identifier": "http://mpeg.org/permission6",
        "metadata": {
        "rdfs:label": "Indie label authorises aggregator to distribute"
        },
        "issuedIn": "http://mpeg.org/contract2",
        "issuer": "http://mpeg.org/RecordLabel",
        "act": "http://mpeg.org/action6",
        "actedBySubject": "http://mpeg.org/Aggregator",
        "actObjects": [
        "http://mpeg.org/Song"
        ]
    },
    "http://mpeg.org/obligation6": {
        "class": "Obligation",
        "type": "Obligation",
        "identifier": "http://mpeg.org/obligation6",
        "metadata": {
        "rdfs:label": "Streaming service must pay 50% to Aggregator"
        },
        "issuedIn": "http://mpeg.org/contract2",
        "issuer": "http://mpeg.org/StreamingService",
        "act": "http://mpeg.org/pay4",
        "actedBySubject": "http://mpeg.org/StreamingService"
    },
    "http://mpeg.org/obligation5": {
        "class": "Obligation",
        "type": "Obligation",
        "identifier": "http://mpeg.org/obligation5",
        "metadata": {
        "rdfs:label": "Streaming service pays 1% to PRO"
        },
        "issuedIn": "http://mpeg.org/contract2",
        "issuer": "http://mpeg.org/StreamingService",
        "act": "http://mpeg.org/pay3",
        "actedBySubject": "http://mpeg.org/StreamingService"
    },
    "http://mpeg.org/permission4": {
        "class": "MCOPermission",
        "type": "MCOPermission",
        "identifier": "http://mpeg.org/permission4",
        "metadata": {
        "rdfs:label": "Author authorises indie label to distribute"
        },
        "issuedIn": "http://mpeg.org/contract2",
        "issuer": "http://mpeg.org/Author",
        "act": "http://mpeg.org/action4",
        "actedBySubject": "http://mpeg.org/RecordLabel",
        "actObjects": [
        "http://mpeg.org/Song"
        ]
    },
    "http://mpeg.org/obligation4": {
        "class": "Obligation",
        "type": "Obligation",
        "identifier": "http://mpeg.org/obligation4",
        "metadata": {
        "rdfs:label": "Streaming service pays 10% to publisher"
        },
        "issuedIn": "http://mpeg.org/contract2",
        "issuer": "http://mpeg.org/StreamingService",
        "act": "http://mpeg.org/pay2",
        "actedBySubject": "http://mpeg.org/StreamingService"
    },
    "http://mpeg.org/obligation3": {
        "class": "Obligation",
        "type": "Obligation",
        "identifier": "http://mpeg.org/obligation3",
        "metadata": {
        "rdfs:label": "Consumer pays a fixed rate"
        },
        "issuedIn": "http://mpeg.org/contract2",
        "issuer": "http://mpeg.org/Consumer",
        "act": "http://mpeg.org/pay1",
        "actedBySubject": "http://mpeg.org/Consumer"
    },
    "http://mpeg.org/obligation9": {
        "class": "Obligation",
        "type": "Obligation",
        "identifier": "http://mpeg.org/obligation9",
        "metadata": {
        "rdfs:label": "Mechanical License Agent must pay to Publisher"
        },
        "issuedIn": "http://mpeg.org/contract2",
        "issuer": "http://mpeg.org/StreamingService",
        "act": "http://mpeg.org/pay7",
        "actedBySubject": "http://mpeg.org/MechanicalLicenseAgent"
    }},
    "actions": {
    "http://mpeg.org/action3": {
        "class": "Provide",
        "type": "Provide",
        "identifier": "http://mpeg.org/action3",
        "actedBy": "http://mpeg.org/RecordLabel",
        "actedOver": [
        "http://mpeg.org/Song"
        ]
    },
    "http://mpeg.org/pay6": {
        "class": "Payment",
        "type": "Payment",
        "identifier": "http://mpeg.org/pay6",
        "actedBy": "http://mpeg.org/RecordLabel",
        "beneficiaries": [
        "http://mpeg.org/Author"
        ],
        "incomePercentage": 10
    },
    "http://mpeg.org/action1": {
        "class": "Play",
        "type": "Play",
        "identifier": "http://mpeg.org/action1",
        "actedBy": "http://mpeg.org/Consumer",
        "actedOver": [
        "http://mpeg.org/Song"
        ]
    },
    "http://mpeg.org/action2": {
        "class": "Distribute",
        "type": "Distribute",
        "identifier": "http://mpeg.org/action2",
        "actedBy": "http://mpeg.org/StreamingService",
        "actedOver": [
        "http://mpeg.org/Song"
        ]
    },
    "http://mpeg.org/action5": {
        "class": "Provide",
        "type": "Provide",
        "identifier": "http://mpeg.org/action5",
        "actedBy": "http://mpeg.org/Publisher",
        "actedOver": [
        "http://mpeg.org/Song"
        ]
    },
    "http://mpeg.org/pay5": {
        "class": "Payment",
        "type": "Payment",
        "identifier": "http://mpeg.org/pay5",
        "actedBy": "http://mpeg.org/Aggregator",
        "beneficiaries": [
        "http://mpeg.org/RecordLabel"
        ],
        "incomePercentage": 85
    },
    "http://mpeg.org/action6": {
        "class": "Distribute",
        "type": "Distribute",
        "identifier": "http://mpeg.org/action6",
        "actedBy": "http://mpeg.org/Aggregator",
        "actedOver": [
        "http://mpeg.org/Song"
        ]
    },
    "http://mpeg.org/pay4": {
        "class": "Payment",
        "type": "Payment",
        "identifier": "http://mpeg.org/pay4",
        "actedBy": "http://mpeg.org/StreamingService",
        "beneficiaries": [
        "http://mpeg.org/Aggregator"
        ],
        "incomePercentage": 50
    },
    "http://mpeg.org/pay3": {
        "class": "Payment",
        "type": "Payment",
        "identifier": "http://mpeg.org/pay3",
        "actedBy": "http://mpeg.org/StreamingService",
        "beneficiaries": [
        "http://mpeg.org/PerformingRighthsOrganisation"
        ],
        "incomePercentage": 1
    },
    "http://mpeg.org/action4": {
        "class": "Distribute",
        "type": "Distribute",
        "identifier": "http://mpeg.org/action4",
        "actedBy": "http://mpeg.org/RecordLabel",
        "actedOver": [
        "http://mpeg.org/Song"
        ]
    },
    "http://mpeg.org/pay2": {
        "class": "Payment",
        "type": "Payment",
        "identifier": "http://mpeg.org/pay2",
        "actedBy": "http://mpeg.org/StreamingService",
        "beneficiaries": [
        "http://mpeg.org/MechanicalLicenseAgent"
        ],
        "incomePercentage": 10
    },
    "http://mpeg.org/pay1": {
        "class": "Payment",
        "type": "Payment",
        "identifier": "http://mpeg.org/pay1",
        "actedBy": "http://mpeg.org/Consumer",
        "amount": 19,
        "beneficiaries": [
        "http://mpeg.org/StreamingService"
        ]
    },
    "http://mpeg.org/pay7": {
        "class": "Payment",
        "type": "Payment",
        "identifier": "http://mpeg.org/pay7",
        "actedBy": "http://mpeg.org/MechanicalLicenseAgent",
        "beneficiaries": [
        "http://mpeg.org/Publisher"
        ],
        "incomePercentage": 50
    }},
    "objects": {
    "http://mpeg.org/Song": {
        "class": "Work",
        "type": "Work",
        "identifier": "http://mpeg.org/Song",
        "metadata": {
        "rdfs:label": "Through her eyes"
        }
    }}}