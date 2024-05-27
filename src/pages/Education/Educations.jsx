import { useEffect, useState } from "react";
import { useEducation } from "../../context/useEducation.js";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTrashAlt, FaFolderPlus } from "react-icons/fa";

const Educations = () => {
  const { getEducations, alertMessage, educations, deleteEducation } = useEducation();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      getEducations();
      setHasFetched(true);
    }
  }, [getEducations, hasFetched]);

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
        <h1>Educations</h1>
        <div className="container-btn-create">
          <Link className="btn-create" to={"/createEducation"}>
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
              {educations.map((education, index) => (
                <tr key={index}>
                  {/* <td>{project._id}</td> */}
                  <td className="center-aligned">{index + 1}</td>
                  <td className="td-title">
                    <div>{education.title}</div>
                  </td>
                  <td>{education.description}</td>
                  <td>{education.place}</td>
                  <td>{formatDate(education.firstDate)}</td>
                  <td>{formatDate(education.secondDate)}</td>

                  <td className="center-aligned actions">
                    <nav>
                      <Link to={`/updateEducation/${education._id}`}>
                        <FaPencilAlt />
                      </Link>
                      <button onClick={() => {deleteEducation(education._id)}}>
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

export default Educations;
