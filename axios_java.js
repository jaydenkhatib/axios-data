
    var width = 450
        height = 450
        margin = 70
    
    var radius = Math.min(width, height) / 2 - margin
    
    var svg = d3.select("#donut_device")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    var data = {Desktop:45.22, Mobile:54.78}
    
    var color = d3.scaleOrdinal()
      .domain(["Mobile", "Desktop"])
      .range(d3.schemeCategory20);
    
    var pie = d3.pie()
      .sort(null) 
      .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
    
    var arc = d3.arc()
      .innerRadius(radius * 0.5)         
      .outerRadius(radius * 0.8)
    
    var outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9)
    
    svg
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "white")
      .style("stroke-width", "5px")
      .style("opacity", 1)
    
    svg
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function(d) {
          var posA = arc.centroid(d) 
          var posB = outerArc.centroid(d) 
          var posC = outerArc.centroid(d); 
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 
          posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
          return [posA, posB, posC]
        })
    
    svg
      .selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
        .text( function(d) { console.log(d.data.key) ; return d.data.key } )
        .attr('transform', function(d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', function(d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        })

var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#media_sites")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/jaydenkhatib/axios-data/main/newsmedia.csv", function(data) {

var x = d3.scaleLinear()
  .domain([0, 0.7])
  .range([ 0, width]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

var y = d3.scaleBand()
  .range([ 0, height])
  .domain(data.map(function(d) { return d.Site; }))
  .padding(.1);
svg.append("g")
  .call(d3.axisLeft(y))

svg.selectAll("myRect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", x(0) )
  .attr("y", function(d) { return y(d.Site); })
  .attr("width", function(d) { return x(d.Share); })
  .attr("height", y.bandwidth() )
  .attr("fill", "#4385BC")

})
        