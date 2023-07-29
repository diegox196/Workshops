document.addEventListener('DOMContentLoaded', () => {
  fetchCoursesData();
});

async function fetchCoursesData() {
  try {
    const response = await fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            courses {
              _id
              name
              credits
              teacher {
                _id
                first_name
                last_name
              }
            }
          }
        `,
      }),
    });

    const data = await response.json();
    const courses = data.data.courses;

    const coursesContainer = document.getElementById('courses');
    coursesContainer.innerHTML = '';

    courses.forEach(course => {
      const courseDiv = document.createElement('div');
      courseDiv.innerHTML = `
        <h3>${course.name}</h3>
        <p>Credits: ${course.credits}</p>
        <p>Teacher: ${course.teacher.first_name} ${course.teacher.last_name}</p>
      `;
      coursesContainer.appendChild(courseDiv);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
