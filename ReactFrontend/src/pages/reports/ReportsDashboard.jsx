import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ReportsDashboard() {
  const { user } = useAuth();

  const roles = user?.roles || [];
  const isAdminOrTeacher =
    roles.includes('Admin') || roles.includes('Teacher');

  return (
    <div className="container">
      <h1 className="mb-4">Reports Dashboard</h1>

      <div className="list-group w-50">

        {isAdminOrTeacher && (
          <Link className="list-group-item" to="/reports/student">
            📘 Student Academic Report
          </Link>
        )}
        <Link className="list-group-item" to="/reports/discipline">
          📚 Discipline Reports
        </Link>

        
        {isAdminOrTeacher && (
          <>
            <Link className="list-group-item" to="/reports/specialty">
              🎓 Average Grade by Specialty & Course
            </Link>

            <Link className="list-group-item" to="/reports/top-students">
              🏆 Top 3 Students by Discipline
            </Link>

            <Link className="list-group-item" to="/reports/diploma-eligible">
              🎓 Eligible for Diploma Work
            </Link>

          </>
        )}

        
      </div>
    </div>
  );
}

