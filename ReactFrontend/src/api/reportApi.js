const baseUrl = 'https://localhost:7266/api/reports';

function authHeaders() {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Unauthorized - please login again');
  }

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

async function handleResponse(res) {
  if (res.status === 401) {
    throw new Error('Unauthorized - please login again');
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const getStudentReport = async (studentId) => {
  const res = await fetch(`${baseUrl}/student/${studentId}`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
};

export const getDisciplineAverage = async (disciplineId) => {
  const res = await fetch(`${baseUrl}/discipline-average/${disciplineId}`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
};

export const getAverageBySpecialty = async (major, course) => {
  const res = await fetch(
    `${baseUrl}/average-by-major-course?major=${encodeURIComponent(
      major
    )}&course=${course}`,
    { headers: authHeaders() }
  );
  return handleResponse(res);
};

export const getTopStudentsByDiscipline = async (disciplineId) => {
  const res = await fetch(`${baseUrl}/top-students/${disciplineId}`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
};

export const getDiplomaEligibleStudents = async (major) => {
  const res = await fetch(
    `${baseUrl}/eligible-for-diploma?major=${encodeURIComponent(major)}`,
    { headers: authHeaders() }
  );
  return handleResponse(res);
};
