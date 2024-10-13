const todos1 = JSON.parse(localStorage.getItem('todos')) || [];

const render = () => {
    const todoList = document.getElementById('todo-list');
    const todosTemplate = todos1.map(t => '<li>' + t + '<input type="checkbox">Completada'+ '<button id="borrar">Eliminar</button>' + '</li>');
    todoList.innerHTML = todosTemplate.join('');
    const elementos = document.querySelectorAll('#todo-list button')        //selecciono el boton para que se borre solo al hacer click en el boton
    elementos.forEach((elemento,i) => {
        elemento.addEventListener('click', () => {
            elemento.parentNode.removeChild(elemento)
            todos1.splice(i , 1)
            actualizaTodos(todos1)
            render()                    //podemos autollamar a la funcion ,esto se llama recursividad que es cuando una fincion se llama asi misma
            console.log(todos1, i);
        })
    })
    
}

const actualizaTodos = () => {
    //transformamos el arreglo de todos
    const todoStrings = JSON.stringify(todos1 )  // lo que pasamos entre () es lo que va a transformar , a eso lo guardamos en una conbstante
    localStorage.setItem('todos', todoStrings) // 
}

window.onload = () => {
    render()
    const form = document.getElementById('todo-form');
    form.onsubmit = (e) =>{
        e.preventDefault();
        const todo = document.getElementById('todo');
        const todoText = todo.value;
        todo.value = '';
        todos1.push(todoText);
        actualizaTodos(todos1)
         render()
        
    }
}