# SolarSystem-
A final year group project written in JavaScript
![image](https://user-images.githubusercontent.com/61597497/158685177-adfbc2b7-9772-4de5-b59f-ff64ea1879a4.png)
For our assessment, we are presenting a 3D rendering of our solar system. I was responsible with lightning, shadowing, shading and setting up the scene, as well as the creation and organization of the 3D models.

To begin, we need a light source at the centre of the solar system (our Sun), therefore we placed a point light at [0,0,0]. The renderer that we use for the project is WebGLRenderer. For the camera, we use a perspective camera, because it makes the objects morph from our point of view. The positioning of the camera in the scene will be [-1,4,2].
![image](https://user-images.githubusercontent.com/61597497/158685308-a3897713-f62d-4d62-a780-e8771d564ec3.png)

•	Orbit Controls: by importing this script, we can easily move around the scene by dragging the canvas viewpoint: left click – rotate, right click – move around, wheel – zoom in/out, etc.

To create the planets and the Sun, we are using the three.js SphereGeometry method. Each planet has different values for radius, width and height. For example, for the Earth we used: var earth_geom = new THREE.SphereGeometry(0.3,32,16); and afterwards we added this geometry as a parameter in order to create a mesh: earth = new THREE.Mesh(new THREE.SphereGeometry(0.3,32,16), earth_mat); and add it to the scene. In order to create the materials for the mesh, we use TextureLoader. The textures that we are using for the planets can be found here: https://www.solarsystemscope.com/textures/
Furthermore, a bump map was added to each planet’s material, to make it look more defined. The bump maps were created in Adobe Photoshop, using the 3D Filter (Generate Bump Map).

To spin the planets I added some lines of code in the animation function to rotate them on their y axis:  sun.rotation.y+=0.001; //sun rotation around its axis
![image](https://user-images.githubusercontent.com/61597497/158685386-cdc2285f-b70d-4245-96a4-66c0847f6006.png)
In order to make the planets rotate around the sun, I defined a variable called t to represent time, and multiplied this by the speed I wanted the planets to rotate: 
    mercury.position.x = Math.sin(t*0.1)*4;
    mercury.position.z = Math.cos(t*0.1)*4;
The size of the planets, as well as their distance from the sun, rotation speed, etc. are based on a Planetary Fact Sheet: https://nssdc.gsfc.nasa.gov/planetary/factsheet/. The solar system is therefore not true-to-scale, because the values are adjusted approximatively.

![Capture3](https://user-images.githubusercontent.com/61597497/158685485-07eb2bd5-8180-4a69-acee-481bb3cdcc34.JPG)
