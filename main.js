Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camera = document.getElementById("Camera_DIV");

Webcam.attach( '#Camera_DIV' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("Result_DIV").innerHTML = '<img id="Captured_IMG" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier(' https://teachablemachine.withgoogle.com/models/tcdaqPNH4/model.json',modelLoaded);

function modelLoaded()
{
  console.log("Model Loaded!");
}

function check()
{
  img = document.getElementById("Captured_IMG");
  classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
  if (error)
  {
    console.error(error);
  }
  else
  {
    console.log(results);
    document.getElementById("result_object_name").innerHTML = results[0].label;
    document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
  }
}