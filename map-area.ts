export class MapArea {

    index: number;
    mapHeight: number;
    mapWidth: number;
    elevation: number;
    higherAreasIndices: number[];
    lowerAreasIndices: number[];
    pathCounter:  { [startingPointIndex: number] : number; } = {};

    constructor(index: number, elevation: number, mapHeight: number, mapWidth: number) {
        this.index = index;
        this.mapHeight = mapHeight;
        this.mapWidth = mapWidth;
        this.elevation = elevation;
        this.higherAreasIndices = [];
        this.lowerAreasIndices = [];
    }

    identifyAdjacentAreas(map: number[]) {
        this.getNorthArea(map);
        this.getSouthArea(map);
        this.getEastArea(map);
        this.getWestArea(map);
    }

    validateArea(adjacentAreaIndex: number, map: number[]) {
        if (adjacentAreaIndex) {
            if (map[adjacentAreaIndex] > this.elevation) {
                this.higherAreasIndices.push(adjacentAreaIndex)
            }
            else if (map[adjacentAreaIndex] < this.elevation) {
                this.lowerAreasIndices.push(adjacentAreaIndex)
            }
        }
    }

    getNorthArea(map: number[]) {
        var northIndex = this.index - this.mapHeight;
        if (northIndex < 0) { northIndex = null; }
        this.validateArea(northIndex, map);
    }

    getSouthArea(map: number[]) {
        var southIndex = this.index + this.mapHeight;
        if (((this.mapHeight * this.mapWidth) - 1) < southIndex) { southIndex = null; }
        this.validateArea(southIndex, map);
    }

    getEastArea(map: number[]) {
        var eastIndex = this.index + 1;
        if (((this.mapHeight * this.mapWidth) - 1) < eastIndex) { eastIndex = null; }
        if (this.index != 0 && ((eastIndex % this.mapWidth) == 0)) { eastIndex = null; }
        this.validateArea(eastIndex, map);
    }

    getWestArea(map: number[]) {
        var westIndex = this.index - 1;
        if (westIndex < 0) { westIndex = null; }
        if ((this.index % this.mapWidth) == 0) { westIndex = null; }
        this.validateArea(westIndex, map);
    }
}