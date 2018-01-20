import { FileHelper } from './file-helper';
import { MapArea } from './map-area';

interface IResult {
    drop: number;
    length: number;
}

let result: IResult;
let FILEPATH = './map.txt';

// load the file and convert to an array
let fileHelper = new FileHelper(FILEPATH);
let rawData = fileHelper.parseContent();

let WIDTH = rawData[0];
let HEIGHT = rawData[1];
let MAXBTM = (WIDTH * HEIGHT) - 1;
let MINBTM = (WIDTH * HEIGHT) - WIDTH;

let areaData = rawData.slice(2);

// convert each number to a MapArea object 
// determination of each area's relationship to its adjacent areas
// is done once 
let mapData = areaData.map((currentValue, index) => {
    var area = new MapArea(index, currentValue, HEIGHT, WIDTH);
    area.identifyAdjacentAreas(areaData);
    return area;
});

// filter only points that do not have any adjacent higher areas
// this is where we start traversing
var startingAreas = mapData.filter(a => a.higherAreasIndices.length == 0);

for (var a = 0; a < startingAreas.length; a++) {
    var counter = 1;
    var area = startingAreas[a];

    traverse(area, area.elevation, counter);
}

function traverse(area: MapArea, startingElevation: number, ctr: number) {

    for (var lai = 0; lai < area.lowerAreasIndices.length; lai++) {

        var lowerArea = mapData[area.lowerAreasIndices[lai]];

        // if there's any elements in lowerAreasIndices, that means its not the end, continue
        if (lowerArea.lowerAreasIndices.length > 0) {
            traverse(lowerArea, startingElevation, ctr + 1);
        }
        else {
            // if the index is at the bottom, this might be the end point
            if (MINBTM >= lowerArea.index && lowerArea.index <= MAXBTM) {
                var drop = startingElevation - lowerArea.elevation;

                if (!result ||
                    (result.length < (ctr + 1)) ||
                    ((result.length == (ctr + 1)) && (result.drop < drop))){
                    result = {
                        drop: drop,
                        length: ctr + 1
                    };
                }
            }
        }
    }
}

console.log(result);