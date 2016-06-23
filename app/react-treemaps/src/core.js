
const DECIMAL_PRECISION = 6;

// Build a tree from a list of chart data for all HUC12s in a single HUC8
// An example query's WHERE field:
// geography_match_id='03020104' and chart_value is not null
export const makeTreeFromHuc8Data = (data) => {
  var catUnitId,
      huc8Tree = {
        ID : 'HUC8 ' + data[0].properties.geography_match_id,
        children : [],
      },
      huc12s = new Map();
  data.forEach( (d) => {
    d = d.properties;
    if (!huc12s.has(d.ID)) {
      huc12s.set(
        d.ID,
        data.filter((e) => d.ID === e.properties.ID).map((f) => f.properties)
      );
    }
  });
  console.log(huc12s)
  huc12s.forEach((arr, id) => {
    // Don't use magic numbers
    if (arr.length === 16) huc8Tree.children.push(makeTreeFromHuc12Data(arr));
  });
  return huc8Tree;
}

// Build a tree from a list of chart data for a single HUC12
// Chart values are rounded and zero values are not used.
export const makeTreeFromHuc12Data = (data) => {
  if (data[0].properties) data = data.map( (d) => d.properties);
  var huc12Tree = data.filter( (d) => d.chart_level === 1)[0];
  console.log(huc12Tree);
  huc12Tree.children = [];
  var chart_levels = new Map();
  // don't use magic numbers
  for (var i=2; i<=4; i++) {
    chart_levels.set(i, data.filter( (d) => {
      d.chart_value = (1*d.chart_value).toFixed(DECIMAL_PRECISION);
      return d.chart_level === i && d.chart_value > 0;
    }));
  }
  chart_levels.get(2).forEach((d) => {
    huc12Tree.children.push(d);
  });
  chart_levels.get(3).forEach((d) => {
    huc12Tree.children.forEach((e) => {
      if (d.chart_matchid === e.chart_id) {
        if (!e.children) e.children = [];
        e.children.push(d);
      }
    })
  });
  chart_levels.get(4).forEach((d) => {
    huc12Tree.children.forEach((e) => {
      if (e.children) {
        e.children.forEach((f) => {
          if (d.chart_matchid === f.chart_id) {
            if (!f.children) f.children = [];
            f.children.push(d);
          }
        });
      }
    });
  });
  console.log('data');
  console.log(data);
  console.log('');
  console.log('tree');
  console.log(huc12Tree);
  console.log('');
  console.log(chart_levels);
  return huc12Tree;
}