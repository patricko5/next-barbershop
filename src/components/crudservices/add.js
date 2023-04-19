import { useState } from "react";
import { useHistory } from "react-router-dom";

const AddUser = () => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });


  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <div className="">
        <input
          className="form-control"
          placeholder="Enter title"
          type="text"
          name="title"
          // value=""
          // onChange={handleChange("name")}
        />
      </div>
      <div className="">
        <input
          className="form-control"
          placeholder="Enter description"
          type="text"
          name="description"
          // value=""
          // onChange={handleChange("name")}
        />
      </div>
      <div className="">
        <input
          className="form-control"
          type="file"
          accept="image/*"
          name="image"
          // onChange={handleChange("image")}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};


/**<div className="">
        <input
          className="form-control"
          placeholder="Enter title"
          type="text"
          name="title"
          // value=""
          // onChange={handleChange("name")}
        />
      </div>
      <div className="">
        <input
          className="form-control"
          placeholder="Enter description"
          type="text"
          name="description"
          // value=""
          // onChange={handleChange("name")}
        />
      </div>
      <div className="">
        <input
          className="form-control"
          type="file"
          accept="image/*"
          name="image"
          // onChange={handleChange("image")}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary">
          Submit
        </button>
      </div>
 */