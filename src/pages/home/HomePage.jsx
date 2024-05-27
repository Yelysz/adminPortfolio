import "./HomePage.css";
import { useEducation } from "../../context/useEducation";
import { useExperience } from "../../context/useExperience";
import { useProjects } from "../../context/useProjects";
import { useSkill } from "../../context/useSkill.js";
import { useEffect, useState } from "react";
import { PiFolderOpenFill } from "react-icons/pi";
import { IoIosSchool } from "react-icons/io";
import { MdWork } from "react-icons/md";
import { GiBrain } from "react-icons/gi";




const HomePage = () => {
  const { getEducations, educations } = useEducation();
  const { getSkills, skills } = useSkill();
  const { getExperiences, experiences } = useExperience();
  const { getProjects, projects } = useProjects();

  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      getEducations();
      getSkills();
      getExperiences();
      getProjects();
      setHasFetched(true);
    }
  }, [getEducations, hasFetched, getSkills, getExperiences, getProjects]);

  const educationCount = educations ? educations.length : 0;
  const skillCount = skills ? skills.length : 0;
  const experienceCount = experiences ? experiences.length : 0;
  const projectCount = projects ? projects.length : 0;

  return (
    <main className="container-home">
      <h1>Dashboard</h1>

      <article className="container-cards">
        <section className="card">
          <div className="bg">
            <div className="container-text">
              <span className="icon-card">
                <PiFolderOpenFill />
              </span>
              <div className="text">
                <span>{projectCount}</span>
                <p>Projects</p>
              </div>
            </div>
          </div>
          <div className="blob"></div>
        </section>

        <section className="card">
        <div className="bg">
            <div className="container-text">
              <span className="icon-card">
                <IoIosSchool />
              </span>
              <div className="text">
                <span>{educationCount}</span>
                <p>Educations</p>
              </div>
            </div>
          </div>
          <div className="blob"></div>
        </section>

        <section className="card">
        <div className="bg">
            <div className="container-text">
              <span className="icon-card">
                <MdWork />
              </span>
              <div className="text">
                <span>{experienceCount}</span>
                <p>Experiences</p>
              </div>
            </div>
          </div>
          <div className="blob"></div>
        </section>

        <section className="card">
        <div className="bg">
            <div className="container-text">
              <span className="icon-card">
                <GiBrain />
              </span>
              <div className="text">
                <span>{skillCount}</span>
                <p>Skills</p>
              </div>
            </div>
          </div>
          <div className="blob"></div>
        </section>
      </article>
    </main>
  );
};

export default HomePage;
