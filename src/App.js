import "./App.css";
import React, { useState, useRef } from "react";

function App() {
  const [Memos, setMemos] = useState(
    JSON.parse(localStorage.getItem("memos")) || []
  );
  const [Url, setUrl] = useState("");
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Tag, setTag] = useState("");

  localStorage.setItem("memos", JSON.stringify(Memos));

  const handleRemove = (index) => {
    const newMemosList = Memos.filter((memo) => memo.id !== index);
    setMemos(newMemosList);
  };

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDesc = (e) => {
    setDescription(e.target.value);
  };

  const handleTag = (e) => {
    setTag(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMemo = {
      id: Memos.length > 0 ? Memos[Memos.length - 1].id + 1 : 1,
      url: Url,
      title: Title,
      description: Description,
      tag: Tag,
    };
    const allMemos = [...Memos, newMemo];
    setMemos(allMemos);
    setUrl("");
    setTitle("");
    setDescription("");
    setTag("");
  };

  return (
    <>
      <div className="input">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>URL:</label>
          <input
            id="url"
            name="url"
            type="text"
            value={Url}
            onChange={(e) => handleUrl(e)}
          />
          <label>Title:</label>
          <input
            name="title"
            id="title"
            type="text"
            value={Title ? Title : Url}
            onChange={(e) => handleTitle(e)}
          />

          <label>Description:</label>
          <input
            id="description"
            name="description"
            type="text"
            value={Description}
            onChange={(e) => handleDesc(e)}
          />
          <label>Hashtag:</label>
          <input
            id="tag"
            name="tag"
            type="text"
            value={Tag}
            onChange={(e) => handleTag(e)}
          />
          <input id="submit" type="submit" value="Save" />
        </form>
      </div>
      <div className="output">
        <ol>
          {Memos.map((memo) => (
            <li key={memo.id}>
              <p>
                <a href={memo.url} target="_blank">
                  {" "}
                  <b>{memo.title}</b>
                </a>
              </p>
              <div class="box">
                <iframe
                  title={memo.title}
                  src={memo.url}
                  width="500"
                  height="550"
                ></iframe>
              </div>
              <p>{memo.description}</p>
              <p>
                {memo.tag !== "" && (
                  <button className="tag">{memo.tag} </button>
                )}
                <button
                  className="remove"
                  onClick={() => handleRemove(memo.id)}
                >
                  remove
                </button>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
