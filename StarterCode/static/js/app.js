//1)  Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.


//Get the bellybutton endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
chartData = null;

function renderCharts (val) {
  renderBarChart(val);
  renderBubbleChart(val);
  displayMetadata(val);
  console.log(chartData)
  console.log(val);
};

function setDropdown () {
  let dropDown = document.getElementById('selDataset');

  for (var i = 0; i < chartData.names.length; i++) {
    var opt = document.createElement('option');
    opt.value = chartData.names[i];
    opt.innerHTML = chartData.names[i];
    dropDown.appendChild(opt);
  }
}

function optionChanged(val) {
  renderCharts(val);
}




function renderBarChart(val)  {
    let sampleData = chartData.samples.filter(i => i.id === val)[0];
    let yValues = sampleData.otu_ids.slice(0, 10).map(otu => `OTU ${otu}`).reverse();
    let xValues = sampleData.sample_values.slice(0, 10).reverse();
    let hoverText = sampleData.otu_labels.slice(0, 10).reverse();

    let trace1 = {
        y: yValues,
        x: xValues,
        text: hoverText,
        type: "bar",
        orientation: "h"
    };

    let layout = {
        title: "Top 10 OTUs"
    };

    Plotly.newPlot("bar", [trace1], layout);
}


//Bubble
function renderBubbleChart(val) {
  let sampleData = chartData.samples.filter(i => i.id === val)[0];

  let trace2 = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: "markers",
      marker: {
          size: sampleData.sample_values,
          color: sampleData.otu_ids,
          colorscale: "Electric"
      }
  };

  let layout = {
      title: "Bubble Chart",
      xaxis: { title: "OTU ID" }
  };

  Plotly.newPlot("bubble", [trace2], layout);
}

    // Display Metadata
    function displayMetadata(val) {
        let metadata = chartData.metadata.filter(i => i.id == val)[0];
        let panel = d3.select("#sample-metadata");
        panel.html(""); // Clear existing metadata

        Object.entries(metadata).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    }


d3.json(url).then(function (jsonData) {
  chartData = jsonData;
  setDropdown();
  renderCharts(jsonData.names[0]);
}.bind(this))




    