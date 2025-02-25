const fields = [
  {
    id: "rect1",
    type: "rect",
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    fill: "red",
  },
  {
    id: "circle1",
    type: "circle",
    x: 200,
    y: 200,
    radius: 50,
    fill: "blue",
  },
  {
    id: "triangle1",
    type: "triangle",
    points: [300, 300, 350, 250, 400, 300],
    fill: "green",
  },
  {
    id: `star1`,
    type: "star",
    x: 150,
    y: 100,
    numPoints: 5,
    innerRadius: 20,
    outerRadius: 40,
    fill: "gold",
    draggable: true,
  },
  {
    id: `heart1`,
    type: "heart",
    x: 200,
    y: 200,
    fill: "red",
    draggable: true,
  },
  {
    id: "emoji1",
    type: "emoji",
    x: 300,
    y: 150,
    text: "😊",
    fontSize: 40,
    draggable: true,
  },
];

export default fields;
