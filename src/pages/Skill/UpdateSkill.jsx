import { useCallback, useEffect, useState } from "react";
import { useSkill } from "../../context/useSkill";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";





const UpdateSkill = () => {
  const { updateSkill, alertMessage, getSkill } = useSkill();
  const params = useParams();
  const navigate = useNavigate();
  const [hasFetched, setHasFetched] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  const fetchProject = useCallback(async () => {
    if (params.id && !hasFetched) {
      try {
        const skill = await getSkill(params.id);
        setValue("title", skill.title);
        setValue("alt", skill.alt);
        setHasFetched(true);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    }
  }, [getSkill, params.id, hasFetched, setValue]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("alt", data.alt);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await updateSkill(params.id, formData);
      navigate("/skills");
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };
  return (
    <form
      className="container-form"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      {alertMessage && (
        <div className={`alert ${alertMessage.type}`}>{alertMessage.text}</div>
      )}
      <h1>Update Skill</h1>
      <label htmlFor="title">Title:</label>
      <div className="inp-container">
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Example: React"
          {...register("title", { required: true })}
          autoFocus
        />
      </div>
      <label htmlFor="alt">Alt:</label>
      <div className="inp-container">
        <textarea
          className="inp-container"
          id="alt"
          name="alt"
          placeholder="Example: React"
          {...register("alt")}
        />
      </div>

      <label htmlFor="image">Image:</label>
      <div className="inp-container img-inp-container">
        <input id="image" type="file" {...register("image")} />
      </div>
      <div className="btn-container">
        <Link to={"/skills"}>{"<"}Back</Link>
        <button type="submit">Update Skill</button>
      </div>
    </form>
  )
}

export default UpdateSkill