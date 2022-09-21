import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditNote.css";
import { Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EditNote = () => {
  const para = useParams();
  const navigate = useNavigate();
  const [status11, setStatus11] = useState(false);
  const [editId, setEditId] = useState("");

  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  useEffect(() => {
    var b = false;
    if (editTitle.length < 10) {
      b = "true";
      setStatus11(true);
    } else {
      b = "false";
      setStatus11(false);
    }
  }, [editTitle]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await axios.get(
      `https://62bec17bbe8ba3a10d5acb6b.mockapi.io/array/${para.id}`
    );
    console.log(result.data, "ress");
    setEditId(result.data.id);
    setEditTitle(result.data.title);
    setEditDesc(result.data.desc);
  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    await axios.put(
      `https://62bec17bbe8ba3a10d5acb6b.mockapi.io/array/${para.id}`,
      {
        title: editTitle,
        desc: editDesc,
      }
    );
    navigate("/home");
    toast.success("Added!");
    console.log(editId);

    setEditTitle("");
    setEditDesc("");
  };

  const handleClose = () => {
    console.log("clicked");
    navigate("/home");
  };

  return (
    <>
      <div className="firsttt">
        <div className="seconddd">
          <form onSubmit={handleSubmit1}>
            <label>Title</label>
            <br></br>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
            <br></br>
            <br></br>
            <label>Description</label>
            <br></br>
            {status11 ? (
              <>
                <input
                  type="text"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  required
                />
                <br></br>
                <br></br>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
                <br></br>
                <br></br>
              </>
            )}
            <input type="submit" value="Add" className="btnnn" />
            &nbsp;&nbsp;
            <button onClick={handleClose} className="btnnn">
              Close
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
};
export default EditNote;
