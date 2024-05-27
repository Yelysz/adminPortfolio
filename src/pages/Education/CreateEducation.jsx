import { useEducation } from "../../context/useEducation.js";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

const CreateEducation = () => {
  const { createEducation, alertMessage } = useEducation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      // Convertir las fechas a objetos Date
      const formattedData = {
        ...data,
        firstDate: data.firstDate ? new Date(data.firstDate) : null,
        secondDate: data.secondDate ? new Date(data.secondDate) : null,
      };

      await createEducation(formattedData);
      navigate("/educations");
    } catch (error) {
      console.error("Error creating education:", error);
    }
  };

  
  return (
    <form className="container-form" onSubmit={handleSubmit(onSubmit)}>
      {alertMessage && (
        <div className={`alert ${alertMessage.type}`}>{alertMessage.text}</div>
      )}
      <h1>Create new Education </h1>
      <label htmlFor="title">Title:</label>
      <div className="inp-container">
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Example: Awesome Project"
          {...register("title", { required: true })}
          autoFocus
        />
      </div>
      <label htmlFor="description">Description:</label>
      <div className="inp-container">
        <textarea
          className="inp-container"
          id="description"
          name="description"
          placeholder="Example: This project is aimed at creating an innovative solution for improving productivity and efficiency in various industries. It involves cutting-edge technology and a user-friendly interface."
          {...register("description")}
        />
      </div>
      <label htmlFor="place">Place:</label>
      <div className="inp-container">
        <input
          id="place"
          name="place"
          type="text"
          placeholder="Example: "
          {...register("place")}
        />
      </div>
      <label htmlFor="firstDate">Start Date:</label>
      <div className="inp-container">
        <input
          id="firstDate"
          name="firstDate"
          type="date"
          {...register("firstDate")}
        />
      </div>
      <label htmlFor="secondDate">End Date:</label>
      <div className="inp-container">
        <input
          id="secondDate"
          name="secondDate"
          type="date"
          {...register("secondDate")}
        />
      </div>

      <div className="btn-container">
        <Link to={"/educations"}>{"<"}Back</Link>
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default CreateEducation;
