const Tarea = require("./Tarea");
require('colors');

class Tareas {
    _listado = {} ;
    constructor() {
        this._listado = {};
    }

    get listadoArr() {
        let listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        });
        return listado;
    }

    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    listarTareas() {
        this.listadoArr.forEach( (tarea, index) => {
            const idx = `${index + 1}`.green;
            const { descripcion, completadoEn }= tarea;
            console.log(
                idx,
                `${descripcion}`.dim, 
                '::'.cyan, 
                completadoEn ? 'Completado'.green : 'Pendiente'.yellow,
            )
            index += 1;
        })
        console.log('\n');

    }

    listarTareasPendientesCompletadas( completadas = true) {
        let contador = 1;
        this.listadoArr.forEach( (tarea) => {
            const { descripcion, completadoEn } = tarea;
            if( completadas ) {
                if( completadoEn ) {
                    console.log(
                        `${contador}.`.green,
                        `${descripcion}`.white, 
                        '::'.cyan, 
                        `${completadoEn}`.green
                        )
                        contador += 1;
                }
            }
            else {
                if( !completadoEn ) {
                    console.log(
                        `${contador}.`.green,
                        `${descripcion}`.white, 
                        ':: Pendiente'.yellow,
                        )
                        contador += 1;
                }
            }
        })
        console.log('\n');

    }

    borrarTarea( id = '' ) {
        delete this._listado[id];
    }

    toggeCompletadas( ids = [] ) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;