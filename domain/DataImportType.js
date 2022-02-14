import AbstractIkologikInstallationsObject from "./AbstractIkologikInstallationsObject.js";

export default class DataImportType extends AbstractIkologikInstallationsObject{
    constructor(customer, installation){
        super(customer, installation);
        this.name = null;
        this.type = null;
        this.active = true;
        this.parameters = {};
        this.mapping = new DataImportTypeMapping();
    }
}

export default class DataImportTypeMapping{
    constructor() {
        this.tags = {};
    }
}

export default class DataImportTypeMappingTag{
    constructor() {
        this.sourceId = null;
        this.sourceName = null;
        this.sourceDataType = null;
        this.sourceDescription = null;
        this.tag = null;
    }
}