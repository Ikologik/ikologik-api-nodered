import AbstractIkologikInstallationsObject from "./AbstractIkologikInstallationsObject.js";

export default class Tag extends AbstractIkologikInstallationsObject{
    constructor(customer, installation) {
        super(customer, installation);
        this.type = null;
        this.name = null;
        this.identification = null;
        this.description = null;
        this.group = null;
        this.importStatus = null;
        this.unit = null;
        this.valueType = null;
        this.valueTimeUnit = null;
        this.decimalPrecision = null;
        this.color = null;
        this.visible = null;
        this.visibleTroubleshooting = null;
        this.gridAlignmentValue = null;
        this.gridAlignmentUnit = null;
        this.transformationActive = null;
        this.transformationMultiplier = null;
        this.transformationAdd = null;
        this.transformationRounding = null;
        this.minLimit = null;
        this.lowLowLimit = null;
        this.lowLimit = null;
        this.highLimit = null;
        this.maxLimit = null;
        this.highHighLimit = null;
        this.maxLimit = null;
        this.medianActive = null;
        this.epsilon = null;
        this.medianActive = null;
        this.medianSampleSize = null;
        this.trendActive = null;
        this.trendSampleSize = null;
        this.epsilon = null;
        this.dataImportStatus = null;
        this.lastDataImportStatusUpdate = null;

    }
}