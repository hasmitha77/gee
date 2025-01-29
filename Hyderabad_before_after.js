// 1. GET A RECENT L8 IMAGE
// Filter by Date, Path and Row
// Get first image from the 2020s
var after = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
                .filterDate('2022-10-01', '2025-01-28')
                .filter(ee.Filter.eq('WRS_PATH', 144))
                .filter(ee.Filter.eq('WRS_ROW', 48))
                .filter(ee.Filter.lt('CLOUD_COVER',5)) //filter scenes with less than 10% cloud cover
                .first()
// Print L8 image metadata to console
print(after, 'After')

// 2. ADD L8 IMAGE AS MAP LAYER

// As True Color RGB:
// Map.addLayer(after.select(['SR_B4','SR_B3','SR_B2']), {min: 7000, max: 30000}, 'After321')

// As False Color RGB:
Map.addLayer(after.select(['SR_B6','SR_B5','SR_B4']), {min: 7000, max: 30000}, 'After543')

// 3. GET AN L5 IMAGE FROM THE 2000s
var before = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
                .filterDate('2001-09-01', '2007-09-30')
                .filter(ee.Filter.eq('WRS_PATH', 144))
                .filter(ee.Filter.eq('WRS_ROW', 48))
                .first()
// Print L5 image metadata to console
print(before)

// 4. CREATE BEFORE/AFTER MAP WITH SLIDER
var linkedMap = new ui.Map();

// // Add L5 as True Color RGB
// linkedMap.addLayer(before, {
//   bands: ['SR_B3', 'SR_B2','SR_B1'],
//   min: 7000,
//   max: 30000,
// }, 'Before321');

// Add L5 as False Color RGB
linkedMap.addLayer(before, {
  bands: ['SR_B5', 'SR_B4','SR_B3'],
  min: 7000,
  max: 30000,
}, 'Before543')

// Link the Before and After maps
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);

// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = new ui.SplitPanel({
  firstPanel: linker.get(1),
  secondPanel: linker.get(0), 
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);

// //NDWI = Green - NIR / Green + NIR
// var NDWI_2022 = after.normalizedDifference(['SR_B3','SR_B5'])
// var NDWI_2004 = before.normalizedDifference(['SR_B3','SR_B5'])

// // 2. ADD L8 IMAGE AS MAP LAYER

// //Add NDWI before and after
// Map.addLayer(NDWI_2022)
// Map.addLayer(NDWI_2004)
