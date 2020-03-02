// credit to 
// Teddy Wong https://www.facebook.com/groups/814245715638154/permalink/1012425975820126/
// Catalyst https://www.youtube.com/watch?v=B-kU2HIZ__0

// Import Library
const Scene = require('Scene');
export const Diagnostics = require('Diagnostics');

const NativeUI = require('NativeUI');
const Materials = require('Materials');
const Persistence = require('Persistence');
const Time = require('Time');
const Textures = require('Textures');

// inital value 
// Scene.root.find('porkbun1').hidden = false;
// Scene.root.find('egg1').hidden = true;
// Scene.root.find('eggtart1').hidden = true;

// Slider
var lastSliderValue = 0.3;
var persistenceTimer = null;

const mat1 = Materials.get('makeup');
const mat2 = Materials.get('lips')
const slider = NativeUI.slider;

// Picker 
const picker = NativeUI.picker;

let currentIndex = 0;

const configuration = {
  selectedIndex : 0,
  items : [
    {image_texture : Textures.get('t1')},
    {image_texture : Textures.get('t2')},
    {image_texture : Textures.get('t3')},
    {image_texture : Textures.get('t4')},
    {image_texture : Textures.get('t5')},
    {image_texture : Textures.get('t6')},

    ]
}

// config
configureSlider();
picker.configure(configuration);
slider.visible = true;
picker.visible = true;

// picker selection
picker.selectedIndex.monitor().subscribe(function(value){
  let index = value.newValue;

//porkbun
  if (index == 0){
    Scene.root.find('porkbun1').hidden = false;
    Scene.root.find('egg1').hidden = true;
    Scene.root.find('eggtart1').hidden = true;
    Scene.root.find('macau1').hidden = true;

    Scene.root.find('porkbun2').hidden = false;
    Scene.root.find('egg2').hidden = true;
    Scene.root.find('eggtart2').hidden = true;
    Scene.root.find('macau2').hidden = true;
    Scene.root.find('lips').hidden = false;

  }

  //egg
  else if(index == 1){
    Scene.root.find('porkbun1').hidden = true;
    Scene.root.find('egg1').hidden = false;
    Scene.root.find('eggtart1').hidden = true;
    Scene.root.find('macau1').hidden = true;

    Scene.root.find('porkbun2').hidden = true;
    Scene.root.find('egg2').hidden = false;
    Scene.root.find('eggtart2').hidden = true;
    Scene.root.find('macau2').hidden = true;

    Scene.root.find('lips').hidden = false;

  }

  //eggtart
  else if(index == 2){
    Scene.root.find('porkbun1').hidden = true;
    Scene.root.find('egg1').hidden = true;
    Scene.root.find('eggtart1').hidden = false;
    Scene.root.find('macau1').hidden = true;

    Scene.root.find('porkbun2').hidden = true;
    Scene.root.find('egg2').hidden = true;
    Scene.root.find('eggtart2').hidden = false;
    Scene.root.find('macau2').hidden = true;

    Scene.root.find('lips').hidden = false;

  }
  //church
  else if(index == 3){
    Scene.root.find('porkbun1').hidden = true;
    Scene.root.find('egg1').hidden = true;
    Scene.root.find('eggtart1').hidden = true;
    Scene.root.find('macau1').hidden = false;

    Scene.root.find('porkbun2').hidden = true;
    Scene.root.find('egg2').hidden = true;
    Scene.root.find('eggtart2').hidden = true;
    Scene.root.find('macau2').hidden = false;

    Scene.root.find('lips').hidden = false;

  }
  //lips X
  else if(index == 4){
    Scene.root.find('porkbun1').hidden = true;
    Scene.root.find('egg1').hidden = true;
    Scene.root.find('eggtart1').hidden = true;
    Scene.root.find('macau1').hidden = true;

    Scene.root.find('porkbun2').hidden = true;
    Scene.root.find('egg2').hidden = true;
    Scene.root.find('eggtart2').hidden = true;
    Scene.root.find('macau2').hidden = true;

    Scene.root.find('lips').hidden = true;

  }
  // makeup only
  else if(index == 5){
    Scene.root.find('porkbun1').hidden = true;
    Scene.root.find('egg1').hidden = true;
    Scene.root.find('eggtart1').hidden = true;
    Scene.root.find('macau1').hidden = true;

    Scene.root.find('porkbun2').hidden = true;
    Scene.root.find('egg2').hidden = true;
    Scene.root.find('eggtart2').hidden = true;
    Scene.root.find('macau2').hidden = true;

    Scene.root.find('lips').hidden = false;

  }

})

// slider selection

slider.value.monitor({fireOnInitialValue: false}).subscribe(function(value) {
    lastSliderValue = value.newValue;
    
    if (!persistenceTimer) { 
      let sliderData = { 'sliderVal': lastSliderValue };
      persistenceTimer = Time.setTimeout(saveUserData.bind(null, sliderData), 200);
    }

    mat1.opacity = lastSliderValue;
    mat2.opacity = lastSliderValue;
  });


function saveUserData(sliderData) {
    persistenceTimer = null;
    Persistence.userScope.set('sliderdata', sliderData);
}  

  function configureSlider(){
    Persistence.userScope.get('sliderdata')
    .then(function(result) {
      NativeUI.slider.value = result.sliderVal;
    })
    .catch(function() {
      NativeUI.slider.value = 0.6;
    });
  }

  