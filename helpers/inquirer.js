const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'option', 
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Mostrar Tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Mostrar Tareas Completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Mostrar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar Tareas`
            },
            {
                value: '6',
                name: `${'6.'.green} Eliminar Tareas`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    },

]

const inquirerMenu = async() => {
    console.clear();
    console.log('-------------------------------'.green);
    console.log('|    Seleccione una opcion    |'.green);
    console.log('-------------------------------\n'.green);

    const { option } = await inquirer.prompt(preguntas);
    // console.log(`${'1.'.green} Crear Tarea`);
    // console.log(`${'2.'.green} Mostrar Tareas`);
    // console.log(`${'3.'.green} Mostrar Tareas Completadas`);
    // console.log(`${'4.'.green} Mostrar Tareas Pendientes`);
    // console.log(`${'5.'.green} Completar Tareas`);
    // console.log(`${'6.'.green} Eliminar Tareas`);
    // console.log(`${'0.'.green} Salir`);
    return option;


}

const inquirerPausa = async() => {
    const questionEnter = [
        {
            type: 'input',
            name: 'enter',
            message: `Oprime ${'ENTER'.cyan} para continuar...`,
            value: 'ENTER'
        }
    ]
    await inquirer.prompt(questionEnter);
    // return enter

}

const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Porfavor ingrese un valor!.';
                } 
                return true;
            }
        }
    ];

    const { descripcion } = await inquirer.prompt(question)
    return descripcion
}

const listarTareaBorrar = async( tareas = []) => {
    const choices = tareas.map( ( tarea, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.descripcion } `
        }
    });
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const completarTareas = async( tareas = []) => {
    const choices = tareas.map( ( tarea, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.descripcion } `,
            checked: tarea.completadoEn
        }
    });
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

const confirmarTareaEliminar = async( message ) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
} 

module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listarTareaBorrar,
    confirmarTareaEliminar,
    completarTareas
}