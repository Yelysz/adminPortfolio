import "./Skills.css";
import {
  FaPencilAlt,
  FaTrashAlt,
  FaFolderPlus,
} from "react-icons/fa";
import { useSkill } from "../../context/useSkill";
import ImageModal from "../../components/home/ImageModal.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Skills = () => {
  const { alertMessage, getSkills, skills, deleteSkill } = useSkill();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      getSkills();
      setHasFetched(true);
    }
  }, [getSkills, hasFetched]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };
  return (
    <>
      <main className="container-project">
        {alertMessage && (
          <div className={`alert ${alertMessage.type}`}>
            {alertMessage.text}
          </div>
        )}
        <h1>Skills</h1>
        <div className="container-btn-create">
          <Link className="btn-create" to={"/createSkill"}>
            {" "}
            <FaFolderPlus className="icon"  /> Create New 
          </Link>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="th-no">#</th>
                <th className="th-title">Title</th>
                <th>Alt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, index) => (
                <tr key={index}>
                  <td className="center-aligned">{index + 1}</td>
                  <td className="td-title">
                    <div>
                      {skill.image?.secure_url && (
                        <img
                          src={skill.image?.secure_url}
                          alt={skill.alt}
                          width="100"
                          onClick={() => openModal(skill.image?.secure_url)}
                        />
                      )}

                      {skill.title}
                    </div>
                  </td>
                  <td>{skill.alt}</td>
                  <td className="center-aligned actions">
                    <nav>
                      <Link to={`/updateSkill/${skill._id}`}>
                        <FaPencilAlt />
                      </Link>
                      <button onClick={() => {deleteSkill(skill._id)}}>
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
      <ImageModal
        isOpen={isModalOpen}
        image={selectedImage}
        onClose={closeModal}
      />
    </>
  );
};

export default Skills;
