let angleX = 0;
let angleY = 0;
let sideLength = 100;
let canvas1 = document.getElementById("canvas1");
let canvas2 = document.getElementById("canvas2");

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('canvas1'); // canvasを指定したIDの要素に配置
}

function draw() {
  background(220);

  // 立方体の回転
  rotateX(angleX);
  rotateY(angleY);

  // 立方体の描画
  stroke(0);
  fill(150, 150, 250);
  box(sideLength);

  // 角度の更新
  angleX += 0.01;
  angleY += 0.01;
}


ーーーーーーーーーーー

let x, y; // 円の位置
let xspeed, yspeed; // 円の速度
let radius = 30; // 円の半径

function setup() {
  createCanvas(400, 400);
  // 初期位置と速度を設定
  x = random(radius, width - radius);
  y = random(radius, height - radius);
  xspeed = random(1, 3);
  yspeed = random(1, 3);
}

function draw() {
  background(220);
  
  // 円を描画
  ellipse(x, y, radius * 2);
  
  // 円を移動
  x = x + xspeed;
  y = y + yspeed;
  
  // 画面端に衝突した場合、反対方向に跳ね返る
  if (x + radius > width || x - radius < 0) {
    xspeed = -xspeed;
  }
  if (y + radius > height || y - radius < 0) {
    yspeed = -yspeed;
  }
}

------

<style>
#canvas1, #canvas2 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>



     // シーンの作成
     const scene = new THREE.Scene();

     // カメラの作成
     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
     camera.position.z = 5;

     // レンダラーの作成
     const renderer = new THREE.WebGLRenderer({ alpha: true }); // 背景色を透明にするため alpha プロパティを true に設定
     renderer.setSize(window.innerWidth, window.innerHeight);
     document.getElementById('canvas2').appendChild(renderer.domElement);