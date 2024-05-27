import { useForm } from "react-hook-form";
import { useEducation } from "../../context/useEducation.js";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const UpdateEducation = () => {
  const { updateEducation, alertMessage, getEducation } = useEducation();
  const { register, handleSubmit, setValue } = useForm();
  const params = useParams();
  const [hasFetched, setHasFetched] = useState(false);
  const navigate = useNavigate();

  const fetchProject = useCallback(async () => {
    if (params.id && !hasFetched) {
      try {
        const education = await getEducation(params.id);
        setValue("title", education.title);
        setValue("description", education.description);
        setValue("place", education.place);
        setValue(
          "firstDate",
          education.firstDate
            ? new Date(education.firstDate).toISOString().split("T")[0]
            : ""
        );
        setValue(
          "secondDate",
          education.secondDate
            ? new Date(education.secondDate).toISOString().split("T")[0]
            : ""
        );
        setHasFetched(true);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    }
  }, [getEducation, params.id, hasFetched, setValue]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        firstDate: data.firstDate ? new Date(data.firstDate) : null,
        secondDate: data.secondDate ? new Date(data.secondDate) : null,
      };

      await updateEducation(params.id, formattedData);
      navigate("/educations");
    } catch (error) {
      console.error("Error update education:", error);
    }
  };
  return (
    <form className="container-form" onSubmit={handleSubmit(onSubmit)}>
      {alertMessage && (
        <div className={`alert ${alertMessage.type}`}>{alertMessage.text}</div>
      )}
      <h1>Update new Education </h1>
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
        <button type="submit">Update</button>
      </div>
    </form>
  );
};

export default UpdateEducation;
