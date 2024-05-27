import "./App.css";
import LoginPage from "./pages/auth/LoginPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import Skills from "./pages/Skill/Skills.jsx";
import Projects from "./pages/Project/Projects.jsx";
import Experiences from "./pages/Experience/Experiences.jsx";
import Educations from "./pages/Education/Educations.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import { ProjectProvider } from "./context/ProjectsContext.jsx";
import CreateProject from "./pages/Project/CreateProject.jsx";
import UpdateProject from "./pages/Project/UpdateProject.jsx";
import { SkillProvider } from "./context/SkillContext.jsx";
import CreateSkill from "./pages/Skill/CreateSkill.jsx";
import UpdateSkill from "./pages/Skill/UpdateSkill.jsx";
import { EducationProvider } from "./context/EducationContext.jsx"
import { ExperienceProvider } from "./context/ExperienceContext.jsx";
import CreateExperience from "./pages/Experience/CreateExperience.jsx";
import UpdateExperience from "./pages/Experience/UpdateExperience.jsx";
import CreateEducation from "./pages/Education/CreateEducation.jsx";
import UpdateEducation from "./pages/Education/UpdateEducation.jsx";

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <SkillProvider>
          <EducationProvider>
            <ExperienceProvider>
              <Router>
                <div style={{ display: "flex" }}>
                  {/* Sidebar/Navbar */}

                  <div style={{ display: "flex" }}>
                    <Navbar />
                    <Routes>
                      <Route path="/login" element={<LoginPage />} />
                      <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/educations" element={<Educations />} />
                        <Route
                          path="/createEducation"
                          element={<CreateEducation />}
                        />
                        <Route
                          path="/updateEducation/:id"
                          element={<UpdateEducation />}
                        />
                        <Route path="/projects" element={<Projects />} />
                        <Route
                          path="/createProject"
                          element={<CreateProject />}
                        />
                        <Route
                          path="/updateProject/:id"
                          element={<UpdateProject />}
                        />
                        <Route path="/experiences" element={<Experiences />} />
                        <Route
                          path="/createExperience"
                          element={<CreateExperience />}
                        />
                        <Route
                          path="/updateExperience/:id"
                          element={<UpdateExperience />}
                        />

                        <Route path="/skills" element={<Skills />} />
                        <Route path="/createSkill" element={<CreateSkill />} />
                        <Route
                          path="/updateSkill/:id"
                          element={<UpdateSkill />}
                        />
                      </Route>
                    </Routes>
                  </div>
                </div>
              </Router>
            </ExperienceProvider>
          </EducationProvider>
        </SkillProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
