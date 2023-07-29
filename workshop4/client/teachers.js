document.addEventListener('DOMContentLoaded', () => {
  fetchTeachersData();
});

async function fetchTeachersData() {
  try {
    const response = await fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            teachers {
              _id
              first_name
              last_name
              cedula
              age
            }
          }
        `,
      }),
    });

    const data = await response.json();
    const teachers = data.data.teachers;

    const teachersContainer = document.getElementById('teachers');
    teachersContainer.innerHTML = '';

    teachers.forEach(teacher => {
      const teacherDiv = document.createElement('div');
      teacherDiv.innerHTML = `
        <h3>${teacher.first_name} ${teacher.last_name}</h3>
        <p>Cedula: ${teacher.cedula}</p>
        <p>Age: ${teacher.age}</p>
      `;
      teachersContainer.appendChild(teacherDiv);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
