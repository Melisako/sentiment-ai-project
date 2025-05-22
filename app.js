let sentimentModel;

sentimentModel = ml5.sentiment('movieReviews');

let modelReady = false;


const interval = setInterval(() => {
  if (sentimentModel && sentimentModel.predict) {
    modelReady = true;
    console.log("✅ Modeli u ngarkua me sukses!");
    clearInterval(interval);
  }
}, 100);


async function analyze() {
  const text = document.getElementById('inputText').value;

  if (text.trim() === "") {
    document.getElementById('result').innerText = "Ju lutem shkruani diçka!";
    return;
  }

  if (!modelReady) {
    document.getElementById('result').innerText = "Modeli është duke u ngarkuar... provo pak më vonë.";
    return;
  }

  const prediction = sentimentModel.predict(text);

  let emotion = "Neutral";
  if (prediction.score > 0.66) {
    emotion = "Pozitiv 😊";
  } else if (prediction.score < 0.33) {
    emotion = "Negativ 😞";
  }

  document.getElementById('result').innerText =
    `Rezultati: ${emotion} (Shkallë: ${prediction.score.toFixed(2)})`;
}
