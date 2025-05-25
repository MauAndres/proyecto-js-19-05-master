const students=[];

const tableBody=document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");

document.getElementById("studentForm").addEventListener("submit",function(e){
    e.preventDefault();

    const name=document.getElementById("name").value.trim();
    const lastName=document.getElementById("lastName").value.trim();
    const grade = document.getElementById("grade").value.trim();

    if(grade < 1 || grade > 7 || !name || !lastName || isNaN(grade)){
        alert("Error de Datos Incorrectos")
        return
    }

    // Cambia aquí: convierte grade a número
    const student = { name, lastName, grade: Number(grade) }
    students.push(student);
    addStudentToTable(student);
    calcularPromedio();


    //console.log(students)
    this.reset();

})

function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=
    `<td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td><button class="delete">Eliminar</button></td>
    <td><button class="edit-btn">Modificar</button></td>
    `;
    row.querySelector(".delete").addEventListener("click",function(){
        deleteEstudiante(student,row);
    });
    row.querySelector(".edit-btn").addEventListener("click",function(){
        editEstudiante(student, row);
    });
    tableBody.appendChild(row);
}

function deleteEstudiante(student,row){
    const index=students.indexOf(student);  //buscar estudiante en array
    if(index > -1){
        students.splice(index,1);
        row.remove();
        calcularPromedio();
    }
}


function calcularPromedio(){
    if(students.length===0){
        averageDiv.textContent="Promedio General del Curso: N/A"
        return;
    }

    const total=students.reduce((sum,s)=>sum+s.grade,0)
    const average=total/students.length;
    averageDiv.textContent=`Promedio General del Curso: ${average.toFixed(2)}`;
}

function editEstudiante(student, row) {
    // Rellena el formulario con los datos del estudiante
    document.getElementById("name").value = student.name;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("grade").value = student.grade;

    // Elimina el estudiante actual de la lista y la fila de la tabla
    const index = students.indexOf(student);
    if(index > -1){
        students.splice(index,1);
        row.remove();
        calcularPromedio();
    }
}