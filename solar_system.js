//Initialize a Kinectron instance
console.log("Initialize a Kinectron instance");
var kinectron = new Kinectron();
console.log("Done");

//Define a function to load local file
console.log("Define a function to load local file");
function readTextFile(file, callback) 
{
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() 
    {
        if (rawFile.readyState === 4) 
        {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
console.log("Done");

//Load motion JSON file
console.log("Load motion JSON file");

// JSON variables
var numJsonFrames = 0;
var jsonMotion = null;

// Read the JSON file motion.json
readTextFile("motion.json", function(text)
{
   jsonMotion = JSON.parse(text);
   numJsonFrames = Object.keys(jsonMotion).length;
   console.log("Total Frame = " + numJsonFrames);
}
);
console.log("Done");


//Create the scene
console.log("Create the scene");
var scene = new THREE.Scene();
console.log("Done");

//Create the camera
console.log("Create the camera");
var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = -1;
camera.position.z = 4;
camera.position.y = 2;
console.log("Done");

//Create the renderer
console.log("Create the renderer");
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
console.log("Done");

//Create the camera controller
console.log("Create the camera controller");
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();
console.log("Done");

//Add ambient light
console.log("Add the ambient light");
var lightAmbient = new THREE.AmbientLight(0x888888); 
scene.add(lightAmbient);
console.log("Done");

//Create point light (Sun)
var light = new THREE.PointLight(0xffffff);
light.position.set(0, 0, 0);
light.intensity = 0.8;
light.castShadow = true;
scene.add(light);

//Create the stars
console.log("Create the stars");
var stars_geom = new THREE.Geometry();
var stars_mat = new THREE.ParticleBasicMaterial( { color: 0xe6e6fa, 
                                                   size: 1,
                                                   sizeAttenuation: false } );
var stars;

//creating random points uniformly distributed
for (var i=0; i<5000;i++) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random()*2-1;
    vertex.y = Math.random()*2-1;
    vertex.z = Math.random()*2-1;
    vertex.multiplyScalar(10); 
    stars_geom.vertices.push(vertex);
}

stars = new THREE.ParticleSystem(stars_geom, stars_mat);
stars.scale.set(50,50,50);
scene.add(stars);

var stars_geom2 = new THREE.Geometry();
var stars_mat2 = new THREE.ParticleBasicMaterial( { color: 0xbbbbbb, opacity:0.6, size: 1,
                                                        sizeAttenuation: false } );
var stars2;

//creating random points uniformly distributed
for (var i=0; i<1000;i++) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random()*2-1;
    vertex.y = Math.random()*2-1;
    vertex.z = Math.random()*2-1;
    vertex.multiplyScalar(10); 
    stars_geom2.vertices.push(vertex);
}

stars2 = new THREE.ParticleSystem(stars_geom2, stars_mat2);
stars2.scale.set(100,100,100);
scene.add(stars2);

console.log("Done");

//Create the Sun
console.log("Create the Sun");
var sun = null;
var sun_mat = null;
var loader = new THREE.TextureLoader();

loader.load(
    'textures/Sun.jpg',
    function ( texture ) {
        var sun_mat = new THREE.MeshPhongMaterial(
             { map: texture, 
               bumpMap: new THREE.TextureLoader().load('textures/Sun_bump.jpg'),
               emissive: 0xffa500,
               emissiveIntensity: 0.3
        } );
        sun_mat.bumpScale = 0.05;
            
        sun = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 16), sun_mat);
        sun.position.set(0,0,0);
        scene.add(sun);
    },
    function ( xhr ) {
        console.log ( (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function ( xhr ) {
        console.log ('An error happened');
    }
);
console.log("Done");

//Create Mercury
console.log("Create Mercury");
var mercury = null;
var mercury_geom = new THREE.SphereGeometry(0.2,32,16);
var loader = new THREE.TextureLoader();

loader.load(
    'textures/Mercury.jpg',
    function ( texture ) {
        var mercury_mat = new THREE.MeshPhongMaterial(
             { map: texture, 
               bumpMap: new THREE.TextureLoader().load('textures/Mercury_bump.jpg')
        } );
        mercury_mat.bumpScale = 0.05;
            
        mercury = new THREE.Mesh(new THREE.SphereGeometry(0.2,32,16), mercury_mat);
        mercury.position.set(25,0,0);
        scene.add(mercury);
    },
    function ( xhr ) {
        console.log ( (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function ( xhr ) {
        console.log ('An error happened');
    }
);
console.log("Done");

//Create Venus
console.log("Create Venus");
var venus = null;
var venus_geom = new THREE.SphereGeometry(0.3,32,16);
var loader = new THREE.TextureLoader();

loader.load(
    'textures/Venus.jpg',
    function ( texture ) {
        var venus_mat = new THREE.MeshPhongMaterial(
             { map: texture, 
               bumpMap: new THREE.TextureLoader().load('textures/Venus_bump.jpg')
        } );
        venus_mat.bumpScale = 0.05;
            
        venus = new THREE.Mesh(new THREE.SphereGeometry(0.3,32,16), venus_mat);
        venus.position.set(28,0,0);
        scene.add(venus);
    },
    function ( xhr ) {
        console.log ( (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function ( xhr ) {
        console.log ('An error happened');
    }
);
console.log("Done");


//Create the Earth
console.log("Create the Earth");
var earth = null;
var earth_geom = new THREE.SphereGeometry(0.3,32,16);
var loader = new THREE.TextureLoader();

loader.load(
    'textures/Earth.jpg',
    function ( texture ) {
        var earth_mat = new THREE.MeshPhongMaterial(
             { map: texture, 
               bumpMap: new THREE.TextureLoader().load('textures/Earth_bump.jpg')
        } );
        earth_mat.bumpScale = 0.05;
            
        earth = new THREE.Mesh(new THREE.SphereGeometry(0.3,32,17), earth_mat);
        earth.position.set(31,0,0);
        scene.add(earth);
    },
    function ( xhr ) {
        console.log ( (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function ( xhr ) {
        console.log ('An error happened');
    }
);
console.log("Done");

//Create Mars
console.log("Create Mars");
var mars = null;
var mars_geom = new THREE.SphereGeometry(0.2,32,16);
var loader = new THREE.TextureLoader();

loader.load(
    'textures/Mars.jpg',
    function ( texture ) {
        var mars_mat = new THREE.MeshPhongMaterial(
             { map: texture, 
               bumpMap: new THREE.TextureLoader().load('textures/Mars_bump.jpg')
        } );
        mars_mat.bumpScale = 0.05;
            
        mars = new THREE.Mesh(new THREE.SphereGeometry(0.2,32,17), mars_mat);
        mars.position.set(34,0,0);
        scene.add(mars);
    },
    function ( xhr ) {
        console.log ( (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function ( xhr ) {
        console.log ('An error happened');
    }
);
console.log("Done");

//Create Jupiter
console.log("Create Jupiter");
var jupiter = null;
var jupiter_geom = new THREE.SphereGeometry(0.4,32,16);
var loader = new THREE.TextureLoader();

loader.load(
    'textures/Jupiter.jpg',
    function ( texture ) {
        var jupiter_mat = new THREE.MeshPhongMaterial(
             { map: texture, 
               bumpMap: new THREE.TextureLoader().load('textures/Jupiter_bump.jpg')
        } );
        jupiter_mat.bumpScale = 0.05;
            
        jupiter = new THREE.Mesh(new THREE.SphereGeometry(0.4,32,17), jupiter_mat);
        jupiter.position.set(37,0,0);
        scene.add(jupiter);
    },
    function ( xhr ) {
        console.log ( (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function ( xhr ) {
        console.log ('An error happened');
    }
);
console.log("Done");

//Create Saturn
console.log("Create Saturn");
var saturn = null;
var saturn_geom = new THREE.SphereGeometry(0.35,32,16);
var loader = new THREE.TextureLoader();

loader.load(
    'textures/Saturn.jpg',
    function ( texture ) {
        var saturn_mat = new THREE.MeshPhongMaterial(
             { map: texture, 
               bumpMap: new THREE.TextureLoader().load('textures/Saturn_bump.jpg')
        } );
        saturn_mat.bumpScale = 0.05;
            
        saturn = new THREE.Mesh(new THREE.SphereGeometry(0.35,32,17), saturn_mat);
        saturn.position.set(40,0,0);
        scene.add(saturn);
    },
    function ( xhr ) {
        console.log ( (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function ( xhr ) {
        console.log ('An error happened');
    }
);
console.log("Done");

//Create Uranus
console.log("Create Uranus");
var uranus = null;
var uranus_geom = new THREE.SphereGeometry(0.3,32,16);
var loader = new THREE.TextureLoader();

loader.load(
    'textures/Uranus.jpg',
    function ( texture ) {
        var uranus_mat = new THREE.MeshPhongMaterial(
             { map: texture, 
               bumpMap: new THREE.TextureLoader().load('textures/Uranus_bump.jpg')
        } );
        uranus_mat.bumpScale = 0.05;
            
        uranus = new THREE.Mesh(new THREE.SphereGeometry(0.3,32,17), uranus_mat);
        uranus.position.set(43,0,0);
        scene.add(uranus);
    },
    function ( xhr ) {
        console.log ( (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function ( xhr ) {
        console.log ('An error happened');
    }
);
console.log("Done");

//Create Neptune
console.log("Create Neptune");
var neptune = null;
var neptune_geom = new THREE.SphereGeometry(0.2,32,16);
var loader = new THREE.TextureLoader();

loader.load(
    'textures/Neptune.jpg',
    function ( texture ) {
        var neptune_mat = new THREE.MeshPhongMaterial(
             { map: texture, 
               bumpMap: new THREE.TextureLoader().load('textures/Neptune_bump.jpg')
        } );
        neptune_mat.bumpScale = 0.05;
            
        neptune = new THREE.Mesh(new THREE.SphereGeometry(0.2,32,17), neptune_mat);
        neptune.position.set(46,0,0);
        scene.add(neptune);
    },
    function ( xhr ) {
        console.log ( (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function ( xhr ) {
        console.log ('An error happened');
    }
);
console.log("Done");


//Create a function to update meshes using motion
console.log("Create a function to update meshes using motion");
function getBodies(skeletonFrame)
{
	meshLH.position.x = skeletonFrame.joints[kinectron.HANDLEFT].cameraX;
	meshLH.position.y = skeletonFrame.joints[kinectron.HANDLEFT].cameraY;
	meshLH.position.z = skeletonFrame.joints[kinectron.HANDLEFT].cameraZ;
	meshRH.position.x = skeletonFrame.joints[kinectron.HANDRIGHT].cameraX;
	meshRH.position.y = skeletonFrame.joints[kinectron.HANDRIGHT].cameraY;
	meshRH.position.z = skeletonFrame.joints[kinectron.HANDRIGHT].cameraZ;
}
console.log("Done");

//Create the animation function
console.log("Create the animation function");
var iFrame = 0;
var t=0;
function animate() 
{
	requestAnimationFrame(animate);
    iFrame ++;

    if (numJsonFrames > 0)
    {
    	var iFrameToRender = iFrame % numJsonFrames;
        getBodies(jsonMotion[iFrameToRender]);
    }

    sun.rotation.y+=0.001; //sun rotation around its axis
    mercury.rotation.y+=0.003; //mercury rotation around its axis
    venus.rotation.y+=0.0001; // venus rotation around its axis
    earth.rotation.y+=0.05; //earth rotation around its axis
    mars.rotation.y+=0.05; // mars rotation around its axis
    jupiter.rotation.y+=0.1; //jupiter rotation around its axis
    saturn.rotation.y+=0.1; // saturn rotation around its axis
    uranus.rotation.y+=0.05; //uranus rotation around its axis
    neptune.rotation.y+=0.05; //neptune rotation around its axis

    //mercury's position in the solar system and its rotation speed
    mercury.position.x = Math.sin(t*0.1)*4;
    mercury.position.z = Math.cos(t*0.1)*4;
    
    //venus' position in the solar system and its rotation speed
    venus.position.x = Math.sin(t*0.01)*5;
    venus.position.z = Math.cos(t*0.01)*5;
    
    //earth's position in the solar system and its rotation speed
    earth.position.x = Math.sin(t*0.3)*6;
    earth.position.z = Math.cos(t*0.3)*6;

    //mars' position in the solar system and its rotation speed
    mars.position.x = Math.sin(t*0.3)*7;
    mars.position.z = Math.cos(t*0.3)*7;

    //jupiter's position in the solar system and its rotation speed
    jupiter.position.x = Math.sin(t*0.4)*8;
    jupiter.position.z = Math.cos(t*0.4)*8;

    //saturn's position in the solar system and its rotation speed
    saturn.position.x = Math.sin(t*0.45)*9;
    saturn.position.z = Math.cos(t*0.45)*9;

    //uranus' position in the solar system and its rotation speed
    uranus.position.x = Math.sin(t*0.15)*10;
    uranus.position.z = Math.cos(t*0.15)*10;

    //neptune's position in the solar system and its rotation speed
    neptune.position.x = Math.sin(t*0.2)*11;
    neptune.position.z = Math.cos(t*0.2)*11;

    //make the planets rotate around the sun (180 degrees)
    t+=Math.PI/180*2;

   	renderer.render(scene, camera);
}
animate();
console.log("Done");

