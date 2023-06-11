// URL del backend para obtener la lista de profesores
const teachersURL = 'http://localhost:3001/api/teachers';

// URL del backend para interactuar con los cursos
const coursesURL = 'http://localhost:3001/api/courses';

// Obtener referencia a los elementos del formulario y la lista de cursos
const courseList = document.getElementById('course-list');
const courseTeacherSelect = document.getElementById('course-teacher');

function createCourse() {
  const courseName = document.getElementById('course-name').value;
  const courseCredits = document.getElementById('course-credits').value;
  const courseTeacher = courseTeacherSelect.value;

  const newCourse = {
    name: courseName,
    credits: parseInt(courseCredits),
    teacher: courseTeacher
  };

  fetch(coursesURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCourse)
  })
    .then(response => response.json())
    .then(data => {
      // Limpiar el formulario
      clearForm();
      // Actualizar la lista de cursos
      getCourses();
    })
    .catch(error => {
      console.error('Error al crear el curso', error);
    });
}

// Función para obtener la lista de cursos
function getCourses() {
  fetch(coursesURL)
    .then(response => response.json())
    .then(data => {
      // Limpiar la lista de cursos
      courseList.innerHTML = '';

      // Mostrar cada curso en la lista
      data.forEach(course => {
        const listItem = document.createElement('li');
        const teacher = (course.teacher) ? `${course.teacher.first_name} ${course.teacher.last_name}` : "";
        listItem.innerHTML = `
          <span>${course.name} - ${course.credits} creditos - ${teacher}</span>
          <button class="edit-button" data-id="${course._id}">Editar</button>
          <button class="delete-button" data-id="${course._id}">Eliminar</button>
        `;

        // Agregar eventos para editar y eliminar cursos
        const editButton = listItem.querySelector('.edit-button');
        const deleteButton = listItem.querySelector('.delete-button');

        editButton.addEventListener('click', () => {
          editCourse(course._id);
        });

        deleteButton.addEventListener('click', () => {
          deleteCourse(course._id);
        });

        courseList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error al obtener la lista de cursos', error);
    });
}

// Función para actualizar un curso
function updateCourse(courseId) {
  const updatedCourse = {
    name: document.getElementById('course-name').value,
    credits: document.getElementById('course-credits').value,
    teacher: document.getElementById('course-teacher').value
  };

  fetch(`${coursesURL}?id=${courseId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedCourse)
  })
    .then(response => response.json())
    .then(data => {
      // Limpiar el formulario
      clearForm();

      // Cambiar el texto y el evento del botón de guardar
      const saveButton = document.getElementById('save-button');
      saveButton.textContent = 'Guardar';
      saveButton.removeEventListener('click', updateCourse);
      saveButton.addEventListener('click', createCourse);
      // Actualizar la lista de cursos
      getCourses();
    })
    .catch(error => {
      console.error('Error al actualizar el curso', error);
    });
}

// Función para editar un curso
function editCourse(courseId) {
  // Obtener los datos del curso actual
  fetch(`${coursesURL}?id=${courseId}`)
    .then(response => response.json())
    .then(data => {
      const { name, credits, teacher } = data;

      // Actualizar los valores del formulario de edición
      document.getElementById('course-name').value = name;
      document.getElementById('course-credits').value = credits;

      // Seleccionar el profesor actual en el menú desplegable
      const options = courseTeacherSelect.options;
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === teacher._id) {
          options[i].selected = true;
          break;
        }
      }

      // Cambiar el texto y el evento del botón de guardar
      const saveButton = document.getElementById('save-button');
      saveButton.textContent = 'Actualizar';
      saveButton.removeEventListener('click', createCourse);
      saveButton.addEventListener('click', () => {
        updateCourse(courseId);
      });
    })
    .catch(error => {
      console.error('Error al obtener los datos del curso', error);
    });
}

// Función para eliminar un curso
function deleteCourse(courseId) {
  fetch(`${coursesURL}?id=${courseId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      // Actualizar la lista de cursos
      getCourses();
    })
    .catch(error => {
      console.error('Error al eliminar el curso', error);
    });
}

// Obtener la lista de profesores y construir las opciones del menú desplegable
fetch(teachersURL)
  .then(response => response.json())
  .then(data => {
    data.forEach(teacher => {
      const option = document.createElement('option');
      option.value = teacher._id;
      option.textContent = teacher.first_name + ' ' + teacher.last_name;
      courseTeacherSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error al obtener la lista de profesores', error);
  });

// Obtener la lista de cursos al cargar la página
getCourses();

// Función para limpiar el formulario
function clearForm() {
  document.getElementById('course-id').value = '';
  document.getElementById('course-name').value = '';
  document.getElementById('course-credits').value = '';
  courseTeacherSelect.selectedIndex = 0;
}

const createCourseButton = document.getElementById('save-button');
// Función para crear un nuevo curso
createCourseButton.addEventListener('click', createCourse);