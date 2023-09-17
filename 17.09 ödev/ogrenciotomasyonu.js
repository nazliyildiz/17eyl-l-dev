// // Öğrenci listemele

// function renderStudents() {
//     const studentList = document.querySelector('#studentList');
//     studentList.innerHTML = '';

//     for (const student of students) {
//         studentList.innerHTML += `
//             <div class="studentItem">
//                 <img src="${student.photo}" alt="${student.name}">
//                 <p><strong>${student.name} ${student.surname}</strong></p>
//                 <p>Yaş: ${student.age}</p>
//                 <p>Cinsiyet: ${student.gender}</p>
//                 <button data-studentid="${student.id}" class="removeButton">Sil</button>
//                 <button data-studentid="${student.id}" class="editButton">Düzenle</button>
//             </div>
//         `;
//     }

//     bindEvents();
// }

// // öğrenci ekleme 
// const addStudentBtn = document.querySelector('#addStudentBtn');
// addStudentBtn.addEventListener('click', () => {
//     const name = prompt('Öğrenci adı');
//     const surname = prompt('Öğrenci soyadı');
//     const age = Number(prompt('Öğrenci yaş'));
//     const gender = prompt('Öğrenci cinsiyeti');
//     const photo = prompt('Öğrenci fotoğraf adresi');

//     addStudent(name, surname, age, gender, photo);

//     renderStudents();
// });

// // Öğrenci silme 
// function bindEvents() {
//     const removeButtons = document.querySelectorAll('.removeButton');
//     for (const removeButton of removeButtons) {
//         removeButton.addEventListener('click', deleteStudent);
//     }
// }

// function deleteStudent() {
//     const studentId = Number(this.dataset.studentid);
//     removeStudent(studentId);

//     renderStudents();
// }
// // Öğrenci düzeltme
// function bindEvents() {
//     const removeButtons = document.querySelectorAll('.removeButton');
//     for (const removeButton of removeButtons) {
//         removeButton.addEventListener('click', deleteStudent);
//     }

//     const editButtons = document.querySelectorAll('.editButton');
//     for (const editButton of editButtons) {
//         editButton.addEventListener('click', editStudent);
//     }
// }

// function editStudent() {
//     const studentId = Number(this.dataset.studentid);
//     const student = students.find(s => s.id === studentId);

//     const name = prompt('Öğrenci adı', student.name);
//     const surname = prompt('Öğrenci soyadı', student.surname);
//     const age = Number(prompt('Öğrenci yaş', student.age));
//     const gender = prompt('Öğrenci cinsiyeti', student.gender);
//     const photo = prompt('Öğrenci fotoğraf adresi', student.photo);

//     updateStudent(studentId, name, surname, age, gender, photo);

//     renderStudents();
// }
// // Öğrenci filtreleme
// function filterStudents() {
//     const searchTerm = document.querySelector('#searchTerm').value.toLowerCase();
//     const filteredStudents = students.filter(student => 
//         student.name.toLowerCase().includes(searchTerm) ||
//         student.surname.toLowerCase().includes(searchTerm)
//     );

//     const studentList = document.querySelector('#studentList');
//     studentList.innerHTML = '';

//     for (const student of filteredStudents) {
//         studentList.innerHTML += `
//             <div class="studentItem">
//                 <img src="${student.photo}" alt="${student.name}">
//                 <p><strong>${student.name} ${student.surname}</strong></p>
//                 <p>Yaş: ${student.age}</p>
//                 <p>Cinsiyet: ${student.gender}</p>
//                 <button data-studentid="${student.id}" class="removeButton">Sil</button>
//                 <button data-studentid="${student.id}" class="editButton">Düzenle</button>
//             </div>
//         `;
//     }

//     bindEvents();
// }

// document.querySelector('#searchButton').addEventListener('click', filterStudents);
// document.querySelector('#resetButton').addEventListener('click', resetFilter);

// function resetFilter() {
//     document.querySelector('#searchTerm').value = '';
//     renderStudents();
// }

// // Local Storage
// if (!localStorage.students) {
//     localStorage.students = JSON.stringify(students);
// }

// if (!localStorage.lastGeneratedStudentId) {
//     localStorage.lastGeneratedStudentId = lastGeneratedStudentId;
// }

let students = [];

if(localStorage.students) {
    students = JSON.parse(localStorage.students);
}

let lastGeneratedStudentId = 0;
// son oluşturulan öğrenci id'si

if(localStorage.lastGeneratedStudentId) {
    lastGeneratedStudentId = Number(localStorage.lastGeneratedStudentId);
}

// generate = oluştur
function generateId() {
    lastGeneratedStudentId++; // mevcut id'yi aldık 1 arttırdık
    localStorage.lastGeneratedStudentId = lastGeneratedStudentId;
    return lastGeneratedStudentId;
}

function addStudent(name,surname, age, gender, photo) {
    students.push(
        {
            id: generateId(),
            name,
            surname,
            age,
            gender,
            photo // eğer property ismi ile yazacağımız 
            // değişken ismi aynı ise ikisini tekrar yazmaya gerek yok
        }
    );

    saveChanges();
}
// öğrenci ekleme 
const addStudentBtn = document.querySelector('#addStudentBtn');
addStudentBtn.addEventListener('click', () => {
    const name = prompt('Öğrenci adı');
    const surname = prompt('Öğrenci soyadı');
    const age = Number(prompt('Öğrenci yaş'));
    const gender = prompt('Öğrenci cinsiyeti');
    const photo = prompt('Öğrenci fotoğraf adresi');

    addStudent(name, surname, age, gender, photo);

    renderStudents();
});

// addStudent('Nihat Duysak', 19, 'Erkek');
// addStudent('Orhan Ekici', 21, 'Erkek');
console.table(students);

// DOM ile ilişkilerini kurmadan
// kod kısmında işi bitirmemiz lazım

function findStudentIndex(studentId) {
    for(let i = 0; i < students.length; i++) {
        if(students[i].id === studentId) {
            return i;
        }
    }

    return -1;
}

function removeStudent(studentId) {
    const studentIndex = findStudentIndex(studentId);
    if(studentIndex > -1) {
        // ['Nihat', 'Orhan', 'Emirhan']
        // ilk parametre index, ikinci parametre kaç tane eleman sileceği
        students.splice(studentIndex, 1);

        saveChanges(); // to local storage
    } else {
        // indexi bulamadığı senaryo
    }
}

function updateStudent(studentId, name, age, gender) {
    const studentIndex = findStudentIndex(studentId);
    if(studentIndex === -1) { // yani bulunamadıysa
        return;
    }

    const student = students[studentIndex];
    student.name = name;
    student.age = age;
    student.gender = gender;

    saveChanges();
}

// değişiklikleri kaydet
function saveChanges() { // to local storage
    localStorage.students = JSON.stringify(students);
}


// let dizi = ['a', 'b', 'c'];
// let dizi2 = [...dizi];
// dizi2[0] = 'd';

// console.log(dizi[0]);

const studentList = document.querySelector('#studentList');
function renderStudents() {
    // tüm arayüzü oluştur
    
    studentList.innerHTML = ''; // önce temizlik

    for(const student of students) { // renders all the students
        studentList.innerHTML += `<li data-studentid="${student.id}" class="studentItem">${student.name}</li>`;
    }

    bindEvents();
}

function bindEvents() {
    const studentItems = document.querySelectorAll('.studentItem');
    // eğer htmller yeniden yüklenirse daha önce atanan eventListener'lar silinir
    for(const studentItem of studentItems) {
        studentItem.addEventListener('click', magic);
    }

    // çünkü bu method çok uzun oluyor
}

renderStudents(); // sayfa yüklendiğinde öğrencileri render etmek istiyorum
// eğer methodu çağırmazsam sayfa beyaz kalır :(

function magic() {
    const studentId = Number(this.dataset.studentid);
    removeStudent(studentId);

    renderStudents();
}

const addStudentBtn = document.querySelector('#addStudentBtn');
addStudentBtn.addEventListener('click', registerNewStudent);

function registerNewStudent() {
    const name = prompt('Öğrenci adı');
    const age = Number(prompt('Öğrenci yaşı'));
    const gender = prompt('Öğrenci cinsiyeti');
    addStudent(name, age, gender);

    renderStudents();
}


