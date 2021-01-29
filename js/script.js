// Esperar que a página inteira carregue para garantir que todos os elementos estejam em tela
window.addEventListener('load', start);

let globalNames = ['Um', 'Dois', 'Três', 'Quatro', 'Cinco'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

function start() {
  inputName = document.querySelector('#inputName');
  preventFormSubmit();
  activateInput();
  render();
}
//Função para não recarregar a página ao enviar o form
function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  let form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
    render();
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {
    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }

      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }

    let button = document.createElement('button');

    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);

    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    let span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }

  let divNames = document.querySelector('#names');
  divNames.innerHTML = '';
  let ul = document.createElement('ul');

  for (let i = 0; i < globalNames.length; i++) {
    let currentName = globalNames[i];
    let li = document.createElement('li');
    let button = createDeleteButton(i);
    let span = createSpan(currentName, i);

    //é necessário inserir o texto dentro de um elemento.
    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
