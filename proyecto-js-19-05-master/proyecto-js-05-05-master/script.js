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

    
    const student = { name, lastName, grade: Number(grade) }
    students.push(student);
    addStudentToTable(student);
    calcularPromedio();


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
    const index=students.indexOf(student); 
    if(index > -1){
        students.splice(index,1);
        row.remove();
        calcularPromedio();
    }
}


function calcularPromedio() {
    const totalStudentsDiv = document.getElementById("totalStudents");
    const approvedStudentsDiv = document.getElementById("approvedStudents");
    const failedStudentsDiv = document.getElementById("failedStudents");

    if (students.length === 0) {
        averageDiv.textContent = "Promedio General del Curso: N/A";
        totalStudentsDiv.textContent = "Total de Estudiantes: 0";
        approvedStudentsDiv.textContent = "Estudiantes Aprobados: 0";
        failedStudentsDiv.textContent = "Estudiantes Reprobados: 0";
        return;
    }

    const total = students.reduce((sum, s) => sum + s.grade, 0);
    const average = total / students.length;

    const approved = students.filter(s => s.grade >= 4).length;
    const failed = students.filter(s => s.grade < 4).length;

    averageDiv.textContent = `Promedio General del Curso: ${average.toFixed(2)}`;
    totalStudentsDiv.textContent = `Total de Estudiantes: ${students.length}`;
    approvedStudentsDiv.textContent = `Estudiantes Aprobados: ${approved}`;
    failedStudentsDiv.textContent = `Estudiantes Reprobados: ${failed}`;
}

function editEstudiante(student, row) {
    document.getElementById("name").value = student.name;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("grade").value = student.grade;

    const index = students.indexOf(student);
    if(index > -1){
        students.splice(index,1);
        row.remove();
        calcularPromedio();
    }
}