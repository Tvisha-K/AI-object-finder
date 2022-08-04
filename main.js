object = [];

model_status = "";

alarm = "";

object_name = "";

function preload(){

   
}

function start() {

    cocossd = ml5.objectDetector("cocossd", modelLoaded);

    document.getElementById("status").innerHTML = "Status : Detecting objects"
 
    object_name = document.getElementById("text_input").value;

}

function setup() {

    canvas = createCanvas(380, 380);

    canvas.center();

    video = createCapture(VIDEO);

    video.size(380, 380);

    video.hide();

}

function modelLoaded() {

    console.log("model has been loaded successfully");

    model_status = true;


}


function draw() {

    image(video, 0, 0, 380, 380);


    if (model_status != "") {


        cocossd.detect(video, gotResults);

        for (i = 0; i < object.length; i++) {

            document.getElementById("status").innerHTML = "Detecting objects";

            object_label = object[i].label;

            if (object_label == object_name) {

                video.stop();

                cocossd.detect(gotResults);

                speech = new SpeechSynthesisUtterance(object_name + "found");

                window.speechSynthesis.speak(speech);

                document.getElementById("object_status").innerHTML = object_name + " found";
                
            }


            else{

                document.getElementById("object_status").innerHTML = object_name + " not found";

            }

        }

    

    }

}





function gotResults(e, r) {

    if (e) {

        console.error(e)

    } else {

        console.log(r);

        object = r;

    }

}