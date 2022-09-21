import axios from "axios";
import React, { useEffect, useState, useNavigate } from "react";
import { Formik, Form, Field } from "formik";
import $ from "jquery";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const NoteApp = () => {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState(false);
  const [status1, setStatus1] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = () => {
    console.log("clicked");
    setStatus(true);
  };
  const handleClose = () => {
    setStatus(false);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    var a = false;
    if (title.length < 10) {
      a = "true";
      setStatus1(true);
    } else {
      a = "false";
      setStatus1(false);
    }
  }, [title]);
  const getData = async () => {
    var result = await axios.get(
      "https://62bec17bbe8ba3a10d5acb6b.mockapi.io/array"
    );
    console.log(result.data, "resultt");
    setList(result.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var c = false;

    {
      list.map((elem) => {
        if (elem.title == title) c = "true";
      });
    }

    if (c == false) {
      console.log(c);
      await axios.post("https://62bec17bbe8ba3a10d5acb6b.mockapi.io/array", {
        title: title,
        desc: desc,
      });

      setStatus(false);
      toast.success("Added!");
    } else {
      toast.error("Error!");
    }

    setTitle("");
    setDesc("");
    getData();
  };

  const handleDel = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleDeld(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  const handleDeld = async (id) => {
    await axios.delete(
      `https://62bec17bbe8ba3a10d5acb6b.mockapi.io/array/${id}`
    );
    getData();
  };

  return (
    <>
      <div className={status ? "blurrr" : ""} id="main">
        <div className="first">
          <div>
            <p className="a">Note Taking App</p>
          </div>
          <div>
            <p className="b" onClick={handleAdd}>
              <i className="fa-solid fa-plus"></i>ADD
            </p>
          </div>
        </div>
        <hr></hr>
        <div className="secondd">
          {list.length > 0 ? (
            <div className="secondi">
              {list.map((elem) => {
                return (
                  <div className="notes">
                    <div className="note1">{elem.title}</div>
                    <hr></hr>
                    <div className="note2">{elem.desc}</div>
                    <hr></hr>
                    <div className="note3">
                      <Link to={`/${elem.id}/${elem.title}`}>
                        <button className="btn1">
                          <i class="fa-solid fa-pen-to-square fa-xl"></i>
                        </button>
                      </Link>{" "}
                      &nbsp;
                      <button
                        className="btn2"
                        onClick={() => handleDel(elem.id)}
                      >
                        <i class="fa-solid fa-trash fa-xl"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="c">
              <p>No Item in the Note Taking App</p>
            </div>
          )}
        </div>
      </div>
      {status && (
        <div className="second">
          <div>
            <form onSubmit={handleSubmit}>
              <label>TITLE</label>
              <br></br>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <br></br>
              <br></br>
              <label>DESCRIPTION</label>
              <br></br>
              {status1 ? (
                <>
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                  />
                  <br></br>
                  <br></br>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <br></br>
                  <br></br>
                </>
              )}
              <input type="submit" value="Add" className="btn" /> &nbsp;&nbsp;
              <button onClick={handleClose} className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      <Toaster position="top-right" />
    </>
  );
};
export default NoteApp;
