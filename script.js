const materiasLista = [

"Matemática",
"Computación",
"Programación",
"Comunicación",
"Inglés",
"Biología",
"Química",
"Física",
"Contabilidad",
"Estadística",
"Emprendimiento",
"Literatura",
"Ciencias Sociales",
"Educación Física"

];

let alumnos =
JSON.parse(localStorage.getItem("alumnos"))
|| [];

const materiasDiv =
document.getElementById("materias");

materiasLista.forEach((materia,index)=>{

    materiasDiv.innerHTML += `

    <div class="materia-card">

        <h3>${materia}</h3>

        <div class="bimestres">

            <input
            type="number"
            id="${index}b1"
            placeholder="1er Bimestre">

            <input
            type="number"
            id="${index}b2"
            placeholder="2do Bimestre">

            <input
            type="number"
            id="${index}b3"
            placeholder="3er Bimestre">

            <input
            type="number"
            id="${index}b4"
            placeholder="4to Bimestre">

        </div>

    </div>

    `;
});

function registrarAlumno(){

    const clave =
    document.getElementById("clave").value;

    const nombre =
    document.getElementById("nombre").value;

    const edad =
    Number(document.getElementById("edad").value);

    const grado =
    document.getElementById("grado").value;

    let materias = [];

    let sumaGeneral = 0;

    let cantidad = 0;

    materiasLista.forEach((materia,index)=>{

        let b1 =
        Number(
        document.getElementById(`${index}b1`).value
        ) || 0;

        let b2 =
        Number(
        document.getElementById(`${index}b2`).value
        ) || 0;

        let b3 =
        Number(
        document.getElementById(`${index}b3`).value
        ) || 0;

        let b4 =
        Number(
        document.getElementById(`${index}b4`).value
        ) || 0;

        let promedio =
        ((b1+b2+b3+b4)/4).toFixed(2);

        materias.push({

            nombre:materia,

            bimestre1:b1,
            bimestre2:b2,
            bimestre3:b3,
            bimestre4:b4,

            promedio:Number(promedio)

        });

        sumaGeneral += Number(promedio);

        cantidad++;
    });

    let promedioFinal =
    (sumaGeneral/cantidad).toFixed(2);

    let aprobado =
    promedioFinal >= 61;

    let fecha = new Date();

    const alumno = {

        clave,
        nombre:nombre.toUpperCase(),
        edad,
        grado,

        materias,

        promedioFinal,

        aprobado,

        fechaRegistro:
        fecha.toLocaleDateString()

    };

    alumnos.push(alumno);

    localStorage.setItem(
        "alumnos",
        JSON.stringify(alumnos)
    );

    alert("Alumno guardado");

    mostrarAlumnos();
}

function mostrarAlumnos(){

    let resultado =
    document.getElementById("resultado");

    resultado.innerHTML = "";

    alumnos.sort((a,b)=>
        a.grado.localeCompare(b.grado)
    );

    alumnos.forEach((alumno)=>{

        resultado.innerHTML += `

        <div class="alumno">

            <h2>${alumno.nombre}</h2>

            <p>
            <strong>Clave:</strong>
            ${alumno.clave}
            </p>

            <p>
            <strong>Edad:</strong>
            ${alumno.edad}
            </p>

            <p>
            <strong>Grado:</strong>
            ${alumno.grado}
            </p>

            <table>

                <tr>

                    <th>Materia</th>
                    <th>B1</th>
                    <th>B2</th>
                    <th>B3</th>
                    <th>B4</th>
                    <th>Promedio</th>

                </tr>

                ${alumno.materias.map(m=>`

                <tr>

                    <td>${m.nombre}</td>

                    <td>${m.bimestre1}</td>

                    <td>${m.bimestre2}</td>

                    <td>${m.bimestre3}</td>

                    <td>${m.bimestre4}</td>

                    <td>${m.promedio}</td>

                </tr>

                `).join("")}

            </table>

            <div class="promedio">

                Promedio Final:
                ${alumno.promedioFinal}

            </div>

            <div class="
            promedio
            ${alumno.aprobado
            ? 'aprobado'
            : 'reprobado'}">

            ${alumno.aprobado
            ? 'APROBADO'
            : 'REPROBADO'}

            </div>

        </div>

        `;
    });
}

function buscarAlumno(){

    const texto =
    document.getElementById("buscar")
    .value
    .toUpperCase();

    let filtrados = alumnos.filter(alumno=>

        alumno.nombre.includes(texto)

        ||

        alumno.clave.includes(texto)

        ||

        alumno.grado
        .toUpperCase()
        .includes(texto)

    );

    let resultado =
    document.getElementById("resultado");

    resultado.innerHTML = "";

    filtrados.forEach((alumno)=>{

        resultado.innerHTML += `

        <div class="alumno">

            <h2>${alumno.nombre}</h2>

            <p>
            <strong>Clave:</strong>
            ${alumno.clave}
            </p>

            <p>
            <strong>Grado:</strong>
            ${alumno.grado}
            </p>

            <p>
            <strong>Promedio:</strong>
            ${alumno.promedioFinal}
            </p>

        </div>

        `;
    });
}

function eliminarAlumno(){

    let clave =
    prompt("Ingrese la clave del alumno");

    alumnos = alumnos.filter(alumno=>

        alumno.clave !== clave

    );

    localStorage.setItem(
        "alumnos",
        JSON.stringify(alumnos)
    );

    mostrarAlumnos();

    alert("Alumno eliminado");
}

mostrarAlumnos();
