/**
* All the tools needed for triggering functions for different motions.
* Also includes binding the camera to the clenched hands.
* @author - Jake Cooper (w17024579)
*/



//convert to radians from degrees.
function toRadian(degree)
{
  var pi = Math.PI;
  return degree * pi/180
}

/**
Take a name and find it in a list.
**/
function matchName(name,planetList)
{
  for (i=0;i>planetList.length;i++)
  {
    if(name == planetList[i].name)
    {
      return planetList[i].desc;
    }
  }
  return "error";
}

//Find the hands from the given skeleton. Returns [leftHand,rightHand]
//Each returns what the hand is currently doing, 3 being clenched.
function findHands(skeleton)
{
  return [skeleton.leftHandState,skeleton.rightHandState];
}

//Move the camera by 10% of X,Y and Z. Z is inverted due to how cameras look in Three.js
//dirs is an array of [x,y,z].
function ArmMove(cam,dirs)
{

  console.log(dirs);

  x = dirs[0];

  y = dirs[1];

  z = dirs[2];
  z *= -1;

  cam.translateX( toRadian(x*0.1) );
  cam.translateY(toRadian(y*0.1) );
  cam.translateZ( toRadian(z*0.1) );
}

//Same as move the camera, but rotate. Accounting for camera orientation.
//dirs is an array of [x,y,z]. X and Y are swapped here!
function ArmRot(cam,dirs)
{
  x = dirs[1];

  y = dirs[0];

  z = dirs[2];
  z *= -1;

  cam.rotateX(x*0.1);
  cam.rotateY(y*0.1);
  cam.rotateZ(z*0.1);
}

//Most videogames register movement as -1 (inverted), 0 (Not moving) or 1 (Forward) for a given direction.
//This function flattens a vector to it's *sign* , returning -1,0 or 1.
function signVector(vec)
{
  var x = vec.x;
  var y = vec.y;
  var z = vec.z;

  comp = [x,y,z];

  console.log("recieved");
  console.log(comp);

  for (var i = 0 ; i < comp.length ; i++)
	{
      if (comp[i] < 0)
      {

        comp[i] = -1;
      }

      else if (comp[i] > 0)
      {

        comp[i] = 1;
      }

      else
      {

        comp[i] = 0;

      }
	}

  return comp;
}

/**
@param {Array} skeleton - the skeleton being manipulated.
@param {Array} frameBeingRendered - the current kinect frame. This can be the same as the skeleton, but to prevent issues,
these can be destinct variables.
(i.e finding hands.)
@param {Camera} camera - camera in the scene. Needed to translate camera.
@param {object3D} lstart - variable tracking the current state of the hands.
@param {object3D} lstart - variable tracking the current state of the hands.
*/
function handleCamera(leftHandMesh,rightHandMesh,frameBeingRendered,camera,lStart,rStart)
{
  if( findHands(frameBeingRendered[1] == 3 ) )
  {
    if(rStart == null)
    {
      rStart = rightHandMesh.getWorldPosition();
    }
    else
    {
      console.log("sub:");
      var diff = signVector(rStart.sub(rightHandMesh.getWorldPosition() ) );
      ArmMove(camera,diff);


    }
  }

  else
  {
    rStart = null;
  }

  if (findHands( frameBeingRendered[0] ) == 3 ) {
    if(lStart == null)
    {
      lStart = leftHandMesh.getWorldPosition();
    }
    else
    {
      console.log("sub:")
      var diff = signVector(lStart.sub(leftHandMesh.getWorldPosition() ) )
      ArmRot(camera,diff);


    }
  }
  else
  {
    lStart = null;

  }

}
