const { guardarDB, leerDB } = require('./helpers/interaccionDB');
const { 
    inquirerMenu, 
    inquirerPausa, 
    leerInput,
    listarTareaBorrar,
    confirmarTareaEliminar,
    completarTareas } = require('./helpers/inquirer');
const Tareas = require('./models/Tareas');

const main = async() => {
    let opt = ''
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if( tareasDB ) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();
        switch(opt) {
            case '1':
                const descripcion = await leerInput('Descripcion:');
                tareas.crearTarea( descripcion );
                break;
            case '2':
                tareas.listarTareas();
                break;
            case '3': 
                tareas.listarTareasPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarTareasPendientesCompletadas(false);
                break;
            case '5':
                const ids = await completarTareas( tareas.listadoArr );
                tareas.toggeCompletadas( ids );
                break;
            case '6':
                const id = await listarTareaBorrar( tareas.listadoArr );
                if( id !== '0') {
                    const isOk = await confirmarTareaEliminar('Esta seguro que desea eliminar esta tarea?');
                    if( isOk ) {
                        tareas.borrarTarea(id)
                        console.log(`Tarea Borrada.`.green);
                    }
                    else console.log(`Cancelado.`.red)    
                }
        }

        guardarDB( tareas.listadoArr );
        await inquirerPausa();
    }while(opt !== '0');
}

main();