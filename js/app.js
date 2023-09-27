const ingresos = [
    /*{
        ingreso: "Salario", valor: 2000
    },
    {
        ingreso: "Venta auto", valor: 50000
    }*/
];

const egresos = [
    /*{
        egreso: 'Renta', valor: 4000
    },
    {
        egreso: 'Ropa', valor: 800
    }*/
];

var presupuesto = 0;
var porcentajeEgreso = 0;

const cargarCabecero = () => {

    /*let totalIngresosValor = totalIngresos();
    let totalEgresosValor = totalEgresos();*/
    var presupuesto = totalIngresos() - totalEgresos();
    var porcentajeEgreso = totalEgresos() / totalIngresos();

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());

} 

const totalIngresos = () => { 
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;                   
    }
    return totalIngreso;
};

const totalEgresos = () => {
    let totalEgreso = 0
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
};

    const formatoMoneda = valor => valor.toLocaleString('es-MX', {
        style: 'currency',currency: 'MXN', minimumFractionDigits: 2});


    const formatoPorcentaje = porcentaje => porcentaje.toLocaleString('es-MX', {
        style: 'percent', minimumFractionDigits: 2
    });



    const cargarIngresos = () => { 
        let ingresosHTML= '';

        for(let ingreso of ingresos){
            ingresosHTML += crearIngresoHTML(ingreso);
        }
        document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
    }

    const crearIngresoHTML = ingreso => {
        let ingresoHTML = `
        <div class="elemento limpiarEstilos">
                        <div class="elemento_descripcion">${ingreso.descripcion}</div>
                        <div class="derecha limpiarEstilos">
                            <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                            <div class="elemento_eliminar">
                                <button class="elemento_eliminar--btn">
                                    <ion-icon name="close-circle-outline" onclick="eliminarIngresos(${ingreso.id})"></ion-icon>
                                </button>
                            </div>
                        </div>
                    </div>
        `;
        return ingresoHTML;
    };

    const cargarEgresos = () => {
        let egresosHTML = '';
        for(let egreso of egresos){
            egresosHTML += crearEgresoHTML(egreso);
        }
        document.getElementById('lista-egresos').innerHTML = egresosHTML;
    }

    const crearEgresoHTML = egreso => {
        let egresoHTML = `
        <div class="elemento limpiarEstilos">
                        <div class="elemento_descripcion">${egreso.descripcion}</div>
                        <div class="derecha limpiarEstilos">
                            <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                            <div class="elemento_porcentaje">21%</div>
                            <div class="elemento_eliminar">
                                <button class="elemento_eliminar--btn">
                                    <ion-icon name="close-circle-outline"
                                    onclick="eliminarEgresos(${egreso.id})"></ion-icon>
                                </button>
                            </div>
                        </div>
                    </div>
        `;
        return egresoHTML;
    }

    const eliminarIngresos = (id) => {
        let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
        ingresos.splice(indiceEliminar, 1);
        cargarCabecero();
        cargarIngresos();
    }

    const eliminarEgresos = (id) => {
        let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
        egresos.splice(indiceEliminar, 1);
        cargarCabecero();
        cargarEgresos();
    }

    const agregarDato = () => {
        let forma = document.getElementById('forma');
        let tipo = forma.tipo.value;
        let descripcion = forma.descripcion.value;
        let valor = parseFloat(forma.numero.value);
    

        if(descripcion !== '' && valor !== '') {
            if(tipo ===  'ingreso'){
                ingresos.push(new Ingreso(descripcion, valor));

            }else if(tipo === 'egreso'){
                egresos.push(new Egreso(descripcion, valor));;
            }
        }else{
                alert('Llene correctamente los campos "Descripción" y "Valor"');
        };
             
        cargarCabecero();
        cargarIngresos();
        cargarEgresos();

        forma.reset ();
        return false;
}

        const cargarApp = () => {
            cargarCabecero();
            cargarIngresos();
            cargarEgresos();
}

    