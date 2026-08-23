import {useState} from 'react'

function App() {
  const [page, setPage] = useState('home')
  const [students, setStudents] = useState([])
  const [username ,setUsername] = useState(" ")
  const [password, setPassword] = useState(" ")
  const [loginUsername , setLoginUsername] = useState(" ")
  const [loginPassword , setLoginPassword] = useState(" ")
  const [token , setToken] = useState(" ")
  const [courses , setCourses]  = useState([])
  const [courseName, setCourseName] = useState(" ")
  const [courseStudents, setCourseStudents] = useState([])



async function getStudents() {
      const response = await fetch(
          'https://student-management-api.fastapicloud.dev/students',
          {
              method : "GET",
              headers : {
                  'Authorization': `Bearer ${token}`,
              }
          }
      )

      const data = await response.json()
      setStudents(data)
}


async function getCourses(){
      const response = await fetch(
          'https://student-management-api.fastapicloud.dev/courses',
          {
              method : "GET",
              headers : {
                     'Authorization': `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()
    console.log("Courses", data)
    setCourses(data)

}

async function getStudentsByCourse(){
      const response = await fetch(
           `https://student-management-api.fastapicloud.dev/courses/${courseName}/students`,
          {
              method : "GET",
              headers:
                  {
                      'Authorization': `Bearer ${token}`,
                  },
          }
      )
      const data = await response.json()
      setCourseStudents(data)
}

async function loginUser() {
       try {
    const formBody = new URLSearchParams();
    formBody.append('username', loginUsername);
    formBody.append('password', loginPassword);

    const response = await fetch(
      'https://student-management-api.fastapicloud.dev/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      }
    );

    const data = await response.json();
    console.log("status:", response.status);
    console.log("response:", data);

    if (response.status == 200) {
      setToken(data.access_token)
      console.log("Token saved!")
      setPage("dashboard")

    }

  } catch (error) {
    console.error("Login error:", error);
  }
}




  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
          Student Management System
      </h1>

        <button onClick={() => setPage('students')}
               style={{
      width: '160px',
      height: '100px',
      fontSize: '18px',
      borderRadius: '12px',
      border: '1px solid #ccc',
      cursor: 'pointer',
      margin: '8px',
    }}>
            👨 Students
        </button>

        <button onClick={() => setPage('courses')}
                 style={{
      width: '160px',
      height: '100px',
      fontSize: '18px',
      borderRadius: '12px',
      border: '1px solid #ccc',
      cursor: 'pointer',
      margin: '8px',
    }}>

            📚 Courses
        </button>

        <button onClick={() => setPage('courseStudents')}
         style={{
      width: '160px',
      height: '100px',
      fontSize: '18px',
      borderRadius: '12px',
      border: '1px solid #ccc',
      cursor: 'pointer',
      margin: '8px',
    }}>
            🔎Students By Course
        </button>

        <button onClick={() => setPage('register')}
         style={{
      width: '160px',
      height: '100px',
      fontSize: '18px',
      borderRadius: '12px',
      border: '1px solid #ccc',
      cursor: 'pointer',
      margin: '8px',
    }}>
            📝 Register
        </button>

        <button onClick={() => setPage('login')}
         style={{
      width: '160px',
      height: '100px',
      fontSize: '18px',
      borderRadius: '12px',
      border: '1px solid #ccc',
      cursor: 'pointer',
      margin: '8px',
    }}>
            🔐 Login
        </button>



      {page === 'students' && (
        <div>
          <h2>Students</h2>
          <button onClick={getStudents}>Get Students</button>
          {students.map((student) => (
            <div key={student.id}>
              <h3>{student.name}</h3>
              <p>Age: {student.age}</p>
              <p>Major: {student.major}</p>
            </div>
          ))}
          <button onClick={() => setPage('dashboard')}>Back to Dashboard</button>
        </div>
      )}

      {page === 'courses' && (
        <div>
          <h2>Courses Page</h2>
          <button onClick={getCourses}>Get Courses</button>
          {courses.map((course) => (
            <div key={course.id}>
              <h3>{course.name}</h3>
              <p>Credit Hours: {course.credit_hours}</p>
            </div>
          ))}
          <button onClick={() => setPage('dashboard')}>Back to Dashboard</button>
        </div>
      )}

      {page === 'courseStudents' && (
        <div>
          <h2>Students By Course</h2>
          <input
            type="text"
            placeholder="enter course name"
            onChange={(e) => setCourseName(e.target.value)}
          />
          <button onClick={getStudentsByCourse}>View Students</button>
          {courseStudents.map((student) => (
            <div key={student.id}>
              <h3>{student.name}</h3>
              <p>Age: {student.age}</p>
              <p>Major: {student.major}</p>
            </div>
          ))}
          <button onClick={() => setPage('dashboard')}>Back to Dashboard</button>
        </div>
      )}

      {page === 'register' && (
        <div>
          <h2>Register Page</h2>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Register</button>
        </div>
      )}

      {page === 'login' && (
        <div>
          <h2>Login Page</h2>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={loginUser}>Login</button>
        </div>
      )}
      </div>
  )
}



export default App