//-----------------basic control------------------------------------//
//Date: 2021.03.31(WEN) ~ 2021.
//User: yeonghun_lee
//Reference: https://github.com/liabru/matter-js/wiki/Getting-started
//License: MIT(Matters.js)
//Usage
//   1.Must include script 'matter.js' in html file
//       <script src="matter.js"></script>
//
//-----------------------------------------------------------------//

//Caution!!!!
// It's really hilarious lol... anyway
//   'h' must be bigger than 37;; in Bodies.rectangle(x,y,w,h,{option})
//   it does not recognize for mouse event .... (253x68 sized)
//   Either 'w' must be bigger than 50?? (depending on texture size)

var Engine = Matter.Engine,
  Render = Matter.Render,
  Events = Matter.Events,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  World = Matter.World,
  Bodies = Matter.Bodies;

// my canvas
const myCanvas = document.getElementById("matterCanvas");
const canvasWidth = myCanvas.clientWidth;
const canvasHeight = myCanvas.clientHeight;
console.log("W:" + canvasWidth + ", H:" + canvasHeight);

// create an engine
const engine = Engine.create(),
  world = engine.world;

// create a renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  canvas: myCanvas,
  options: {
    width: canvasWidth,
    height: canvasHeight,
    pixelRatio: 1,
    background: "#080808",
    wireframes: false,
  },
});

// create bounds
const colorStr = "#4D4D4D";

const ground = Bodies.rectangle(canvasWidth / 2, canvasHeight - 7, canvasWidth, 15, {
  render: { fillStyle: colorStr },
  isStatic: true,
});
const wallLeft = Bodies.rectangle(7, canvasHeight / 2, 15, canvasHeight, {
  render: { fillStyle: colorStr },
  isStatic: true,
});
const wallRight = Bodies.rectangle(canvasWidth - 7, canvasHeight / 2, 15, canvasHeight, {
  render: { fillStyle: colorStr },
  isStatic: true,
});

// object colors & variables
const border = 2;
const radius = 20;
const scale = 0.5;
const pillWidth = 130;
const pillHeight = 37;

// create objects
function makeVarObj(x, y, w, h, radius, imgPath, scale) {
  // Original Shape
  //  var illustration = Bodies.rectangle(x, y, w, h, {
  //    id: "name",
  //    chamfer: {radius: 20},
  //    render: {
  //      fillStyle: arts
  //      sprite: {
  //        texture: "texture/boolean.png"
  //        xScale: scale,
  //        yScale: scale},
  //      },
  //      isStatic: false,
  //    url: "https://www.instagram.com/",        // <link>
  //    }
  //  });
  return Bodies.rectangle(x, y, w, h, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture: imgPath,
        xScale: scale,
        yScale: scale,
      },
    },
  });
}

const varByteObj = makeVarObj(100, 200, pillWidth, pillHeight, radius, "texture/byte.png", scale);
const varIntObj = makeVarObj(220, 100, pillWidth, pillHeight, radius, "texture/int.png", scale);
const varShoObj = makeVarObj(300, 250, pillWidth, pillHeight, radius, "texture/short.png", scale);
const varLonObj = makeVarObj(400, 50, pillWidth, pillHeight, radius, "texture/long.png", scale);
const varFloObj = makeVarObj(450, 300, pillWidth, pillHeight, radius, "texture/float.png", scale);
const varDouObj = makeVarObj(550, 100, pillWidth, pillHeight, radius, "texture/double.png", scale);
const varChaObj = makeVarObj(620, 400, pillWidth, pillHeight, radius, "texture/char.png", scale);
const varBooObj = makeVarObj(700, 200, pillWidth, pillHeight, radius, "texture/boolean.png", scale);

// add all of the bodies to the world
World.add(engine.world, [
  ground,
  wallLeft,
  wallRight,
  varByteObj,
  varIntObj,
  varShoObj,
  varLonObj,
  varFloObj,
  varDouObj,
  varChaObj,
  varBooObj,
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// Allow page scrolling in matter.js window
mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

// Detect clicks vs. drags
let click = false;

document.addEventListener("mousedown", () => (click = true));
document.addEventListener("mousemove", () => (click = false));
document.addEventListener("mouseup", () => console.log(click ? "click" : "drag"));

// Create a On-Mouseup Event-Handler
Events.on(mouseConstraint, "mouseup", function (event) {
  var mouseConstraint = event.source;
  var bodies = engine.world.bodies;
  if (!mouseConstraint.bodyB) {
    for (i = 0; i < bodies.length; i++) {
      var body = bodies[i];
      // Check if clicked or dragged
      if (click === true) {
        if (Matter.Bounds.contains(body.bounds, mouseConstraint.mouse.position)) {
          var bodyUrl = body.url;
          console.log("Body.Url >> " + bodyUrl);
          // Hyperlinking feature
          if (bodyUrl != undefined) {
            //window.location.href = bodyUrl;
            window.open(bodyUrl, "_blank");
            console.log("Hyperlink was opened");
          }
          break;
        }
      }
    }
  }
});

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
