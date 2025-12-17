import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Students from './pages/Students';
import StudentEdit from './pages/StudentEdit';
import StudentDetails from './pages/StudentDetails';
import StudentCreate from './pages/StudentCreate';

import Teachers from './pages/Teachers';
import TeacherEdit from './pages/TeacherEdit';
import TeacherCreate from './pages/TeacherCreate';
import TeacherDetails from './pages/TeacherDetails';

import Disciplines from './pages/Disciplines';
import DisciplineCreate from './pages/DisciplineCreate';
import DisciplineEdit from './pages/DisciplineEdit';
import DisciplineDetails from './pages/DisciplineDetails';

import Grades from './pages/Grades';
import GradeCreate from './pages/GradeCreate';
import GradeEdit from './pages/GradeEdit';
import GradeDetails from './pages/GradeDetails';

import StudentReport from './pages/reports/StudentReport';
import ReportsDashboard from './pages/reports/ReportsDashboard';
import DisciplineReport from './pages/reports/DisciplineReport';
import SpecialtyReport from './pages/reports/SpecialtyReport';
import TopStudentsReport from './pages/reports/TopStudentsReport';
import DiplomaEligibleReport from './pages/reports/DiplomaEligibleReport';

import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import MyProfile from './pages/MyProfile';
import Users from './pages/Users';
import UserProfile from './pages/UserProfile';

import PrivateGuard from './guards/PrivateGuard';
import RoleGuard from './guards/RoleGuard';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="container my-4 flex-grow-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* My Profile */}
          <Route
            path="/profile"
            element={
              <PrivateGuard>
                <MyProfile />
              </PrivateGuard>
            }
          />

          {/* Users – Admin only */}
          <Route
            path="/users"
            element={
              <RoleGuard roles={['Admin']}>
                <Users />
              </RoleGuard>
            }
          />

          <Route
            path="/profile/:id"
            element={
              <PrivateGuard>
                <UserProfile />
              </PrivateGuard>
            }
          />

          {/* Students */}
          <Route
            path="/students"
            element={
              <PrivateGuard>
                <Students />
              </PrivateGuard>
            }
          />

          <Route
            path="/students/:id"
            element={
              <PrivateGuard>
                <StudentDetails />
              </PrivateGuard>
            }
          />

          <Route
            path="/students/create"
            element={
              <RoleGuard roles={['Admin']}>
                <StudentCreate />
              </RoleGuard>
            }
          />

          <Route
            path="/students/:id/edit"
            element={
              <RoleGuard roles={['Admin', 'Teacher']}>
                <StudentEdit />
              </RoleGuard>
            }
          />

          {/* Teachers */}
          <Route
            path="/teachers"
            element={
              <RoleGuard roles={['Admin', 'Teacher', 'Student']}>
                <Teachers />
              </RoleGuard>
            }
          />

          <Route
            path="/teachers/:id"
            element={
              <RoleGuard roles={['Admin', 'Teacher', 'Student']}>
                <TeacherDetails />
              </RoleGuard>
            }
          />

          <Route
            path="/teachers/create"
            element={
              <RoleGuard roles={['Admin']}>
                <TeacherCreate />
              </RoleGuard>
            }
          />

          <Route
            path="/teachers/:id/edit"
            element={
              <RoleGuard roles={['Admin']}>
                <TeacherEdit />
              </RoleGuard>
            }
          />

          {/* Disciplines */}
          <Route
            path="/disciplines"
            element={
              <RoleGuard roles={['Admin', 'Teacher', 'Student']}>
                <Disciplines />
              </RoleGuard>
            }
          />

          <Route
            path="/disciplines/:id"
            element={
              <RoleGuard roles={['Admin', 'Teacher', 'Student']}>
                <DisciplineDetails />
              </RoleGuard>
            }
          />

          <Route
            path="/disciplines/create"
            element={
              <RoleGuard roles={['Admin']}>
                <DisciplineCreate />
              </RoleGuard>
            }
          />

          <Route
            path="/disciplines/:id/edit"
            element={
              <RoleGuard roles={['Admin', 'Teacher']}>
                <DisciplineEdit />
              </RoleGuard>
            }
          />

          {/* Grades */}
          <Route
            path="/grades"
            element={
              <RoleGuard roles={['Admin', 'Teacher']}>
                <Grades />
              </RoleGuard>
            }
          />

          <Route
            path="/grades/create"
            element={
              <RoleGuard roles={['Admin', 'Teacher']}>
                <GradeCreate />
              </RoleGuard>
            }
          />

          <Route
            path="/grades/:id"
            element={
              <RoleGuard roles={['Admin', 'Teacher']}>
                <GradeDetails />
              </RoleGuard>
            }
          />

          <Route
            path="/grades/:id/edit"
            element={
              <RoleGuard roles={['Admin', 'Teacher']}>
                <GradeEdit />
              </RoleGuard>
            }
          />

          {/* Reports */}

          <Route
            path="/reports/discipline"
            element={
              <RoleGuard roles={['Admin', 'Teacher', 'Student']}>
                <DisciplineReport />
              </RoleGuard>
            }
          />

          
          <Route
            path="/reports"
            element={
              <RoleGuard roles={['Admin', 'Teacher','Student']}>
                <ReportsDashboard />
              </RoleGuard>
            }
          />

          <Route
            path="/reports/student"
            element={
              <RoleGuard roles={['Admin', 'Teacher']}>
                <StudentReport />
              </RoleGuard>
            }
          />

          <Route
            path="/reports/specialty"
            element={
              <RoleGuard roles={['Admin', 'Teacher']}>
                <SpecialtyReport />
              </RoleGuard>
            }
          />

          <Route
            path="/reports/top-students"
            element={
              <RoleGuard roles={['Admin', 'Teacher']}>
                <TopStudentsReport />
              </RoleGuard>
            }
          />

          <Route
            path="/reports/diploma-eligible"
            element={
              <RoleGuard roles={['Admin', 'Teacher']}>
                <DiplomaEligibleReport />
              </RoleGuard>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
