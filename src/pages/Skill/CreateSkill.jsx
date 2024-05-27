import { useSkill } from "../../context/useSkill";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

const CreateSkill = () => {
  const { alertMessage, createSkill } = useSkill();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("alt", data.alt);

    if (data.image[0]) formData.append("image", data.image[0]);
    try {
      await createSkill(formData);
      navigate("/skills");
    } catch (error) {
      console.error("Error creating skill:", error);
    }
  };

  return (
    <form className="container-form" onSubmit={handleSubmit(onSubmit)}>
      {alertMessage && (
        <div className={`alert ${alertMessage.type}`}>{alertMessage.text}</div>
      )}
      <h1>Create new project</h1>
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
      <label htmlFor="alt">Alt:</label>
      <div className="inp-container">
        <input
          id="alt"
          name="alt"
          type="text"
          placeholder="Example: Pasta"
          {...register("alt")}
        />
      </div>
      <label htmlFor="image">Image:</label>
      <div className="inp-container img-inp-container">
        <input id="image" type="file" {...register("image")} />
      </div>
      <div className="btn-container">
        <Link to={"/skills"}>{"<"}Back</Link>
        <button type="submit">Create Skill</button>
      </div>
    </form>
  );
};

export default CreateSkill;
