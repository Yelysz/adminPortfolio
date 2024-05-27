import "./Experiences.css";
import { useEffect, useState } from "react";
import { useExperience } from "../../context/useExperience.js";
import { Link } from "react-router-dom";
import {
  FaPencilAlt,
  FaTrashAlt,
  FaFolderPlus,
} from "react-icons/fa";

const Experiences = () => {
  const { getExperiences, alertMessage, experiences, deleteExperience } = useExperience();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      getExperiences();
      setHasFetched(true);
    }
  }, [getExperiences, hasFetched]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString(undefined, { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <>
      <main className="container-project">
        {alertMessage && (
          <div className={`alert ${alertMessage.type}`}>
            {alertMessage.text}
          </div>
        )}
        <h1>Experiences</h1>
        <div className="container-btn-create">
          <Link className="btn-create" to={"/createExperience"}>
            {" "}
            <FaFolderPlus className="icon"  /> Create New
          </Link>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th className="th-no">#</th>
                <th className="th-title">Title</th>
                <th>Description</th>
                <th>Place</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((experience, index) => (
                <tr key={index}>
                  {/* <td>{project._id}</td> */}
                  <td className="center-aligned">{index + 1}</td>
                  <td className="td-title">
                    <div>{experience.title}</div>
                  </td>
                  <td>{experience.description}</td>
                  <td>{experience.place}</td>
                  <td>{formatDate(experience.firstDate)}</td>
                  <td>{formatDate(experience.secondDate)}</td>

                  <td className="center-aligned actions">
                    <nav>
                      <Link to={`/updateExperience/${experience._id}`}>
                        <FaPencilAlt />
                      </Link>
                      <button onClick={() => {deleteExperience(experience._id)}}>
                        <FaTrashAlt />
                      </button>
                    </nav>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Experiences;
