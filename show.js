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

/// Initialization ///
// module aliases
const Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Composite = Matter.Composite,
  Events = Matter.Events;

// create my canvas
const myCanvas = document.getElementById("matterCanvas");
const canvasWidth = myCanvas.clientWidth;
const canvasHeight = myCanvas.clientHeight;
console.log("W:" + canvasWidth + ", H:" + canvasHeight);

// create an engine
const engine = Engine.create();
const world = engine.world;
let bodies = world.bodies;

// create a renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  canvas: myCanvas,
  options: {
    width: canvasWidth,
    height: canvasHeight,
    background: "rgb(229,243,255)",
    wireframes: false, //if u want change BG_color
  },
});

// object colors & variables
const colorInt = "#EDDC8C";
const colorRNum = "#B3E8F3";
const colorStr = "#4D4D4D";
const colorLgc = "rgb(155,102,102)";

//
let click = false;

/// Control ///

function makeVarObj(x, y, w, h, radius, border, imgPath, scale) {
  const b = Bodies.rectangle(x, y, w, h, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture: imgPath,
        xScale: scale,
        yScale: scale,
      },
    },
  });
  return b;
}

function setFigures() {
  // create figures: boxes, ground, wall and etc
  var ground = Bodies.rectangle(canvasWidth / 2, canvasHeight - 7, canvasWidth, 15, {
    render: { fillStyle: colorStr },
    isStatic: true,
  });
  var wallLeft = Bodies.rectangle(7, canvasHeight / 2, 15, canvasHeight, {
    render: { fillStyle: colorStr },
    isStatic: true,
  });
  var wallRight = Bodies.rectangle(canvasWidth - 7, canvasHeight / 2, 15, canvasHeight, {
    render: { fillStyle: colorStr },
    isStatic: true,
  });

  //special object
  const radius = 20;
  const border = 2;
  const scale = 0.5;
  const pillWidth = 130;
  const pillHeight = 33;
  const varByteObj = makeVarObj(100, 200, pillWidth, pillHeight, radius, border, "texture/byte.png", scale);
  const varIntObj = makeVarObj(220, 100, pillWidth, pillHeight, radius, border, "texture/int.png", scale);
  const varShoObj = makeVarObj(300, 250, pillWidth, pillHeight, radius, border, "texture/short.png", scale);
  const varLonObj = makeVarObj(400, 50, pillWidth, pillHeight, radius, border, "texture/long.png", scale);
  const varFloObj = makeVarObj(450, 300, pillWidth, pillHeight, radius, border, "texture/float.png", scale);
  const varDouObj = makeVarObj(550, 100, pillWidth, pillHeight, radius, border, "texture/double.png", scale);
  const varChaObj = makeVarObj(620, 400, pillWidth, pillHeight, radius, border, "texture/char.png", scale);
  const varBooObj = makeVarObj(700, 200, pillWidth, pillHeight, radius, border, "texture/boolean.png", scale);

  // add all of the figures to the world
  World.add(world, [
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
  document.addEventListener("mousedown", () => (click = true));
  document.addEventListener("mousemove", () => (click = false));
  document.addEventListener("mouseup", () => console.log(click ? "click" : "drag"));
  // Create a On-Mouseup Event-Handler
  Events.on(mouseConstraint, "mouseup", function (event) {
    const mouseConstraint = event.source;
    const bodies = engine.world.bodies;
    if (!mouseConstraint.body) {
      console.log(mouseConstraint.body);
      for (i = 0; i < bodies.length; i++) {
        const body = bodies[i];

        // Check if clicked or dragged
        if (click === true) {
          if (Matter.Bounds.contains(body.bounds, mouseConstraint.mouse.position)) {
            const bodyUrl = body.url;
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
}
/*
function setMouse() {
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
  console.log(mouseConstraint);
  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // Detect clicks vs. drags
  document.addEventListener("mousedown", () => (click = true));
  document.addEventListener("mousemove", () => (click = false));
  document.addEventListener("mouseup", () => console.log(click ? "click" : "drag"));
  // Create a On-Mouseup Event-Handler
  Events.on(mouseConstraint, "mouseup", function (event) {
    var mouseConstraint = event.source;
    var bodies = engine.world.bodies;
    if (mouseConstraint.body) {
      console.log(mouseConstraint.body);
      for (i = 0; i < bodies.length; i++) {
        var body = bodies[i];

        // Check if clicked or dragged
        if (click === true) {
          //console.log(body);
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
}
*/
setFigures();
//setMouse();
// run the engine
Engine.run(engine);
// run the renderer
Render.run(render);
