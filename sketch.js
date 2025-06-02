let img;
let t = 0;
let asciiChars = "█▓▒░#@%*=+-:. ";

function preload() {
  img = loadImage("https://i.imgur.com/eETbfrB.png");
}

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);
  textFont('monospace');
  textSize(12);
  frameRate(30);
  noStroke();
}

function draw() {
  background(255);

  t += 0.01;

  // Oscillations organiques
  let floatX = sin(t * 1.3) * 20;
  let floatY = cos(t * 0.8) * 20;
  let scaleFactor = 0.75 + sin(t * 0.4) * 0.05;

  // Couleur globale fluctuante
  let r = 200 + sin(t * 1.1) * 55;
  let g = 200 + sin(t * 1.3 + PI / 2) * 55;
  let b = 200 + sin(t * 1.7 + PI) * 55;
  background(r, g, b, 20);

  // RGB split
  tint(255, 0, 0, 120);
  image(img, width / 2 + floatX, height / 2 + floatY, img.width * scaleFactor, img.height * scaleFactor);
  tint(0, 255, 0, 120);
  image(img, width / 2 - floatX, height / 2 - floatY, img.width * scaleFactor, img.height * scaleFactor);
  tint(0, 0, 255, 120);
  image(img, width / 2 + sin(t * 2) * 5, height / 2 + cos(t * 2) * 5, img.width * scaleFactor, img.height * scaleFactor);
  noTint();

  // Lignes glitch
  for (let i = 0; i < 10; i++) {
    let y = noise(t + i * 0.2) * height;
    fill(255, 20);
    rect(0, y, width, 2);
  }

  // Grains
  for (let i = 0; i < 200; i++) {
    stroke(0, random(20, 60));
    point(random(width), random(height));
  }

  // ASCII flottants
  fill(0, 180);
  for (let y = 0; y < height; y += 20) {
    for (let x = 0; x < width; x += 20) {
      let d = dist(x, y, width / 2 + floatX, height / 2 + floatY);
      if (d < 300) {
        let charIndex = floor((noise(x * 0.01, y * 0.01, t) * asciiChars.length)) % asciiChars.length;
        let char = asciiChars.charAt(charIndex);
        push();
        translate(x + sin(t + x * 0.01) * 2, y + cos(t + y * 0.01) * 2);
        rotate(sin(t + x * 0.01 + y * 0.01) * 0.1);
        text(char, 0, 0);
        pop();
      }
    }
  }
}
