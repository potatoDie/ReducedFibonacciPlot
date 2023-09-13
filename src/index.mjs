import "./styles.css";
import { points, params } from "./points.js"

var ns = "http://www.w3.org/2000/svg";

const attributes = calculateSVGAttributes(points)

// Based on calculated points , calculate svg vviewbox and stroke-width
function calculateSVGAttributes(points) {
  const minmax = calculateMinMaxXY(points)
  let w = minmax[1][0] - minmax[0][0]
  let h = minmax[1][1] - minmax[0][1]
  let margin = Math.max(w, h) / 10
  let vb = `${minmax[0][0] - margin} ${minmax[0][1] - margin} ${w + 2*margin} ${h + 2*margin}`
  return {viewBox: vb, strokeWidth: Math.max(w, h) / 1000}
}

// Create svg element
var svg = document.createElementNS(ns, "svg");
svg.setAttribute("id", "fibo")
svg.setAttribute("xmlns", ns)
svg.setAttribute("style", "background: #234;")
svg.setAttribute(
  "viewBox",
  attributes.viewBox
);
svg.setAttribute("stroke-width", attributes.strokeWidth)

// And add it to the document
document.body.appendChild(svg);


// Step 2 feed data to function that creates polyline
// You could also just make the whole svg based on the data (including viewbox based on min/max x/y of data)

function makeSVG(points) {
  const pstring = points.reduce((a, c) => `${a}${c} `, "")
  // console.log(pstring);
  
  const pl = document.createElementNS(ns, "polyline");
  pl.setAttribute("points", pstring)
  pl.setAttribute("fill", "none")
  pl.setAttribute("stroke", "white")
  svg.appendChild(pl);
  
}
makeSVG(points)

function calculateMinMaxXY(points) {
  return points.reduce((a, c) => {
    a[0][0] = Math.min(a[0][0], c[0]) // x value
    a[0][1] = Math.min(a[0][1], c[1])
    a[1][0] = Math.max(a[1][0], c[0])
    a[1][1] = Math.max(a[1][1], c[1])
    
    return a
  }, [[Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY], [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY]])
}

document.getElementById("app").innerHTML = `
<button id="bDownload">Download</button>
`

document.getElementById("bDownload").addEventListener('click', () => {
  const s = document.getElementById("fibo").outerHTML
  // TODO Make filename depend on params used
  const filename = `fribo_${params.p}_${params.w}_${params.N}`
  downloadSVG(filename, s)
})

function downloadSVG(filename, text) {
  // text = `<?xml version="1.0" standalone="yes"?> ${text}`
  var element = document.createElement('a');
  element.setAttribute('href', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
