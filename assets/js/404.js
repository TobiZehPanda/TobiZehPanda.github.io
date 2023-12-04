const carouselText = [
  {text: "Page not found :(", color: "#22b8cf"}, //cyan
  {text: "Well that sucks..", color: "#ff6b6b"}, //red
  {text: "Cat sitting on keyboard...", color: "#20c997"}, //teal
  {text: "Erm. I lost the page.", color: "#ff922b"}, //orange
  {text: "Welp...", color: "#51cf66"}, //green
  {text: "Error. Defeated. Again.", color: "#f06595"} //pink
]

$( document ).ready(async function() {
  carousel(carouselText, "#404-text")
});

async function typeSentence(sentence, eleRef, delay = 100) {
  const letters = sentence.split("");
  let i = 0;
  while(i < letters.length) {
    await waitForMs(delay);
    $(eleRef).append(letters[i]);
    i++
  }
  return;
}

async function deleteSentence(eleRef) {
  const sentence = $(eleRef).html();
  const letters = sentence.split("");
  let i = 0;
  while(letters.length > 0) {
    await waitForMs(100);
    letters.pop();
    $(eleRef).html(letters.join(""));
  }
}

async function carousel(carouselList, eleRef) {
    var i = 0;
    while(true) {
      updateFontColor(eleRef, carouselList[i].color)
      await typeSentence(carouselList[i].text, eleRef);
      await waitForMs(1500);
      await deleteSentence(eleRef);
      await waitForMs(500);
      i++
      if(i >= carouselList.length) {i = 0;}
    }
}

function updateFontColor(eleRef, color) {
  $(eleRef).css('color', color);
}

function waitForMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
