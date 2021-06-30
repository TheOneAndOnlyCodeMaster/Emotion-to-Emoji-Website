Webcam.set({
    width: 340,
    height:300,
    dest_width: 350,
    dest_height:300,
    image_format: 'png',
    png_quality: 94
});
camera = document.getElementById("camera");
Webcam.attach(camera);
function take_photo(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='final_pic' src='"+data_uri+"'>";
    })
}
console.log('ml5 version: ', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/u1M-MRDHN/model.json", modelLoaded);
 function modelLoaded(){
     console.log("Model Succesfully loaded");
 }

function speak(){
    var synth = window.speechSynthesis;
    speak1_data = "The first prediction is "+ prediction_1;
    speak2_data = "and the second prediction is "+ prediction_2;
    var say_word = new SpeechSynthesisUtterance(speak1_data + speak2_data);
    synth.speak(say_word);
}
function check_emoji(){
    img = document.getElementById("final_pic");
    classifier.classify(img, getResults);
}
function getResults(error, result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();
        if(prediction_1 == "Mad"){
            document.getElementById("emoji_picture").innerHTML = '&#128544';
        }
        else if(prediction_1 == "Happy"){
            document.getElementById("emoji_picture").innerHTML = '&#128522';
        }
        else if(prediction_1 == "Sad"){
            document.getElementById("emoji_picture").innerHTML = '&#128545';
        }        
        else if(prediction_1 == "Sleepy"){
            document.getElementById("emoji_picture").innerHTML = '&#128554';
        } 
        else if(prediction_1 == "Surprised"){
            document.getElementById("emoji_picture").innerHTML = '&#128562';
        } 
        else if(prediction_1 == "Regular"){
            document.getElementById("emoji_picture").innerHTML = '&#128529';
        } 



        if(prediction_2 == "Mad"){
            document.getElementById("emoji_picture2").innerHTML = '&#128544';
        }
        else if(prediction_2 == "Happy"){
            document.getElementById("emoji_picture2").innerHTML = '&#128522';
        }
        else if(prediction_2 == "Sad"){
            document.getElementById("emoji_picture2").innerHTML = '&#128545';
        }        
        else if(prediction_2 == "Sleepy"){
            document.getElementById("emoji_picture2").innerHTML = '&#128554';
        } 
        else if(prediction_2 == "Surprised"){
            document.getElementById("emoji_picture2").innerHTML = '&#128562';
        } 
        else if(prediction_2 == "Regular"){
            document.getElementById("emoji_picture2").innerHTML = '&#128529';
        } 
    }
}