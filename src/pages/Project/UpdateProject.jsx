import { useCallback, useEffect, useState } from "react";
import { useProjects } from "../../context/useProjects";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";

const UpdateProject = () => {
  const { updateProject, alertMessage, getProject } = useProjects();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const { register, handleSubmit, setValue } = useForm();
  const params = useParams();
  const [hasFetched, setHasFetched] = useState(false);
  const navigate = useNavigate();

  const fetchProject = useCallback(async () => {
    if (params.id && !hasFetched) {
      try {
        const project = await getProject(params.id);
        setValue("title", project.title);
        setValue("description", project.description);
        setTags(project.tags);
        setValue("github", project.github);
        setValue("web", project.web);
        setHasFetched(true);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    }
  }, [getProject, params.id, hasFetched, setValue]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  useEffect(() => {
    register("tags");
  }, [register]);

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue("tags", newTags);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setValue("tags", newTags);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tags", JSON.stringify(tags));
    formData.append("github", data.github);
    formData.append("web", data.web);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await updateProject(params.id, formData);
      navigate("/projects");
    } catch (error) {
      console.error("Error updating project:", error);
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
      <h1>Update Project</h1>
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
          {...register("description", { required: true })}
        />
      </div>
      <div className="inp-container">
        <label htmlFor="tags">Tags:</label>
        <div className="tags-input">
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={handleTagInputChange}
            placeholder="Example: React"
          />
          <button className="btn-tags" type="button" onClick={handleAddTag}>
            <HiPlus />
          </button>
        </div>
        <div className="tags-container">
          {tags.map((tag, index) => (
            <span className="tag tag-span" key={index}>
              {tag}
              <button type="button" onClick={() => handleRemoveTag(index)}>
                X
              </button>
            </span>
          ))}
        </div>
      </div>
      <label htmlFor="urlGit">GitHub URL:</label>
      <div className="inp-container">
        <input
          id="urlGit"
          type="url"
          {...register("github")}
          placeholder="Example: https://github.com/usuario/nombre-proyecto"
        />
      </div>
      <label htmlFor="urlWeb">Web URL:</label>
      <div className="inp-container">
        <input
          id="urlWeb"
          type="url"
          {...register("web")}
          placeholder="Example:https://yourproject.com"
        />
      </div>
      <label htmlFor="image">Image:</label>
      <div className="inp-container img-inp-container">
        <input id="image" type="file" {...register("image")} />
      </div>
      <div className="btn-container">
        <Link to={"/projects"}>{"<"}Back</Link>
        <button type="submit">Update Project</button>
      </div>
    </form>
  );
};

export default UpdateProject;
