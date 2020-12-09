const convert  = document.getElementById('convert');
const table = document.querySelector('#result tbody');
const input = document.converter.weight;
const unit1 = document.getElementById('from');
const unit2 = document.getElementById('to');
var counter = 1;
var list = JSON.parse(localStorage.getItem('result')) || [];

if(list.length){
  list.forEach(function(item){
    addItem(counter, item);
  });
}

input.addEventListener('keyup', function(e){
  
  if(e.target.value.trim() === ''){
    unit1.disabled = true;
    unit2.disabled = true;
  } else {
    unit1.disabled = false;
    unit2.disabled = false;
  }
  
});



convert.addEventListener('click', function(e){
  e.preventDefault();
  
  const select1 = unit1.value;
  const select2 = unit2.value;
  const value = parseInt(input.value);
  
  
  if(Number.isNaN(value)){
    alert('Input is empty or invalid weight');
    input.focus();
    return
  }
  
  const result = toUnit(toKilogramm(value, select1), select2);
  
  const obj = {
    input: {
      value,
      unit: select1
    },
    output: {
      value: result,
      unit: select2
    }
  };
  
  list.push(obj);
  
  addItem(counter, obj);
  localStorage.setItem('result', JSON.stringify(list));
  
  input.value = '';
  
  
});

function addItem(i, data){
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  const td3 = document.createElement('td');
  
  const textNode1 = document.createTextNode(i);
  const textNode2 = document.createTextNode(`${data.input.value} ${data.input.unit}`);
  const textNode3 = document.createTextNode(`${data.output.value} ${data.output.unit}`);
  
  const span = document.createElement('span');
  span.innerHTML = '&times;';
  span.classList.add('close-button');
  
  td1.appendChild(textNode1);
  td2.appendChild(textNode2);
  td3.appendChild(textNode3);
  td3.appendChild(span);
  
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  
  table.appendChild(tr);
  counter++;
}

table.addEventListener('click', function(event){
  const target = event.target;
  
  if(target.classList.contains('close-button')){
    
    const node = target.parentNode.parentNode;
    const index = Array.from(table.children).indexOf(node);
    list = list.filter(function(_, i){
      return i !== index
    });
    localStorage.setItem('result', JSON.stringify(list));
    table.removeChild(node);
    counter = 1;
    table.innerHTML = '';
    list.forEach(function(data){
      addItem(counter, data);
    });
  }
});

function toKilogramm(value=0, unit=''){
  
  switch(unit){
    case 'tn': 
      return value * 1000;
      break;
    case 'ct': 
      return value * 100;
      break;
    case 'gr': 
      return value / 1000;
      break;
    default: 
      return value;
  }
}


function toUnit(value = 0, unit = ''){
  
  switch(unit){
    case 'tn': 
      return value / 1000;
      break;
    case 'ct': 
      return value / 100;
      break;
    case 'gr': 
      return value * 1000;
      break;
    default: 
      return value;
  }
}