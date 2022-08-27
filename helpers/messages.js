require('colors');

const mostrarMenu = () => {
    return new Promise((resolve => {
        console.clear();
        console.log('-------------------------------'.green);
        console.log('|    Seleccione una opcion    |'.green);
        console.log('-------------------------------\n'.green);
    
        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Mostrar Tareas`);
        console.log(`${'3.'.green} Mostrar Tareas Completadas`);
        console.log(`${'4.'.green} Mostrar Tareas Pendientes`);
        console.log(`${'5.'.green} Completar Tareas`);
        console.log(`${'6.'.green} Eliminar Tareas`);
        console.log(`${'0.'.green} Salir`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Seleccione una opcion: ', (opt) => {
            readline.close();
            resolve(opt)
        })
    }));
}

const pausa = () => {

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`Presione ${'ENTER'.cyan} para continuar\n`, (opt) => {
            readline.close();
            resolve()
        })    
    })
}

module.exports = {
    mostrarMenu,
    pausa,
}