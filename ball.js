let x = [];
let y = [];
let xspeed = [];
let yspeed = [];
let radius = 30; // 円の半径
let eyeImage;
let mouthImage;

let soundcount = 0;

let flash = document.getElementById("flash");

// 画面の幅と高さを取得する
var sc_width = window.innerWidth;
var sc_height = window.innerHeight;

const soundFiles = ['./sound/1.mp3', './sound/2.mp3', './sound/3.mp3'];
const sounds = []; // 音声オブジェクトを格納する配列

function preload() {
  // 画像を読み込む
  eyeImage = loadImage('./imgs/eye.png');
  mouthImage = loadImage('./imgs/mouth.png'); // 新しい画像を読み込む
  // 音声ファイルを読み込む
  for (let i = 0; i < soundFiles.length; i++) {
    sounds[i] = loadSound(soundFiles[i]);
  }
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas1'); // canvasを指定したIDの要素に配置
  noLoop();

  for (let i = 0; i < 3; i++) {
    // 初期位置と速度を設定
    x[i] = random(radius, sc_width - radius);
    y[i] = random(radius, sc_height - radius);
    xspeed[i] = 3;
    yspeed[i] = 3;
  }

  document.addEventListener("keydown", function(event) {
    if (event.key === " ") {
      startButton.style.display = "none";
      isDrawing = true;
      loop(); // 描画開始
    }
  });
  
  const startButton = document.getElementById('start');

}

function draw() {
  background(250);

  // 画面の中央座標を取得する
  var cx = sc_width / 2;
  var cy = sc_height / 2;

  // 正方形のサイズを指定
  var size = 200;

  // 正方形を描画する
  fill(0, 0);
  stroke(0, 0);
  rect(cx - size / 2, cy - size / 2, size, size);

  for (let i = 0; i < 3; i++) {
    // 円を移動
    x[i] = x[i] + xspeed[i];
    y[i] = y[i] + yspeed[i];

    // 画面端に衝突した場合、反対方向に跳ね返る
    if (x[i] + radius > sc_width || x[i] - radius < 0) {
      xspeed[i] = -xspeed[i];
    }
    if (y[i] + radius > sc_height || y[i] - radius < 0) {
      yspeed[i] = -yspeed[i];
    }

    // 正方形に衝突した時
    if (x[i] + radius > cx - size / 2 && x[i] - radius < cx + size / 2 && y[i] + radius > cy - size / 2 && y[i] - radius < cy + size / 2) {
      // ランダムな音声ファイルを選択
      let randomIndex = floor(random(sounds.length));
      let randomSound = sounds[randomIndex];

      if(soundcount < 5) {
        // 選択した音声ファイルを再生
        if (randomSound.isLoaded()) {
            randomSound.play();
            soundcount++;
        } else {
            console.log('音声ファイルがまだ読み込まれていません。');
        }
      }
      
      changeRadius();

      flash.style.display = "block";

      setTimeout(function() {
        flash.style.display = "none";
      }, 50);

      if (x[i] > cx) {
        xspeed[i] = abs(xspeed[i]); // 右側にいる場合、xspeedを正にする
      } else {
        xspeed[i] = -abs(xspeed[i]); // 左側にいる場合、xspeedを負にする
      }

      if (y[i] > cy) {
        yspeed[i] = abs(yspeed[i]); // 下側にいる場合、yspeedを正にする
      } else {
        yspeed[i] = -abs(yspeed[i]); // 上側にいる場合、yspeedを負にする
      }
    }

    // 画像を描画
    if (i % 2 === 0) {
      image(eyeImage, x[i] - radius, y[i] - radius, radius * 4, radius * 4);
    } else {
      image(mouthImage, x[i] - radius, y[i] - radius, radius * 4, radius * 4);
    }
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}