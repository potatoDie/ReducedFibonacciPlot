const params = {
  w: 6, // Number of 'arms' or unit vectors that determine direction of consecutive lines
  N: 60, // Number of points
  p: 98, // Reduce fibonumbers to, modulo treshold, cabbalistic reduction
  deler: 15, // Advanced alternating. For alternate none choose deler = 1, rest = 0
  rest: 9
};

const w = params.w;
const N = params.N * params.deler;
const p = params.p;

const arms = [[1, 0]];

const α = (2 * Math.PI) / w;

for (let i = 1; i < w; i++) {
  arms.push([Math.cos(i * α), Math.sin(i * α)]);
}

const fibr = [1, 1];

for (let i = 2; i < N; i++) {
  let x = fibr[i - 2] + fibr[i - 1];
  if (x >= p) {
    x = 1 + x - p;
  }
  fibr.push(x);
}

let filteredFibr = [];

filteredFibr = fibr.filter((_, index) => index % params.deler !== params.rest);

const points = [[0, 0]];

for (let i = 1; i < filteredFibr.length; i++) {
  let j = i - 1;
  let point = [...points[j]];
  let arm = arms[j % arms.length];
  point[0] += arm[0] * filteredFibr[j];
  point[1] += arm[1] * filteredFibr[j];
  points[i] = point;
}

export { params, points };
