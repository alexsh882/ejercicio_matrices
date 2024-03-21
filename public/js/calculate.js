const numberCol = document.querySelector('#number-col');
const numberRow = document.querySelector('#number-row');
const buttonGenerate = document.querySelector('#generate-matrices');
const subtitleMatrix = document.querySelector('#subtitle-matrix');
const formToCalculate = document.querySelector('#form-to-calculate');
const matrix1 = document.querySelector('#matrix-1');
const matrix2 = document.querySelector('#matrix-2');
const buttonSubmit = document.querySelector('#button-submit');
const matrixGenerada = document.querySelector('#matriz-generada');

const generateMatrix = (cols = 1, rows = 1) => {
    subtitleMatrix.textContent = 'Matrices de ' + cols + ' columnas y ' + rows + ' filas';


    matrix1.innerHTML = `<p class="w-full col-span-${cols}">Matriz 1</p>`;
    matrix2.innerHTML = `<p class="w-full col-span-${cols}">Matriz 2</p>`;
    matrix1.classList.add([`grid-cols-${cols}`])
    matrix2.classList.add([`grid-cols-${cols}`])

    for (j = 1; rows >= j; j++) {
        for (i = 1; cols >= i; i++) {
            matrix1.innerHTML += `<input type="number" 
                                             id="m1-row${j}-col${i}" 
                                             min="1" 
                                             class="block p-2 w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">`
            matrix2.innerHTML += `<input type="number" 
                                             id="m2-row${j}-col${i}" 
                                             min="1" 
                                             class="block p-2 w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">`
        }
    }
    buttonSubmit.classList.remove('hidden')
    buttonSubmit.classList.add('block')
}

document.addEventListener('DOMContentLoaded', () => {
    generateMatrix();
})

buttonGenerate.addEventListener('click', (e) => {
    if (numberCol.value == 0 || numberRow.value == 0) {
        subtitleMatrix.textContent = 'Tenes que ingresar números mayores a 0';
        matrix1.innerHTML = '';
        matrix2.innerHTML = '';
        buttonSubmit.classList.add('hidden')
        matrixGenerada.classList.add('hidden')
        return;

    }
    generateMatrix(numberCol.value, numberRow.value)
});
formToCalculate.addEventListener('submit', async (e) => {
    e.preventDefault();
    let matriz1 = [];
    let matriz2 = [];
    let matrizSuma = [];

    //console.log(numberCol.value, numberRow.value)
    for (j = 0; numberRow.value > j; j++) {
        matriz1[j] = [];
        matriz2[j] = [];
        matrizSuma[j] = [];
        for (i = 0; numberCol.value > i; i++) {
            matriz1[j][i] = document.querySelector(`#m1-row${j + 1}-col${i + 1}`).value;
            matriz2[j][i] = document.querySelector(`#m2-row${j + 1}-col${i + 1}`).value;
        }
    };

    try {
        const resp = await fetch('/calcular', {
            method: 'POST',
            body: JSON.stringify({
                matriz1: matriz1,
                matriz2: matriz2,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        matrixGenerada.classList.remove('hidden')
        matrixGenerada.innerHTML = '';
        matrixGenerada.classList.add([`grid-cols-${numberCol.value}`])

        if (resp.status !== 200) {
            const { error } = await resp.json();
            matrixGenerada.innerHTML = `<p> ${error} </p>`;
            return;
        }

        const { matrizSuma } = await resp.json();

        matrizSuma.forEach((row, j) => {
            row.forEach((col, i) => {
                matrixGenerada.innerHTML += `<p> ${col} </p>`;
            })
        })
    } catch (error) {

    }



})