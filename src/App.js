import "./App.css";
import { useEffect, useState } from "react";
import Item from "./Item";

function App() {
  const [data, setData] = useState([]);
  const [historyLike, setHistoryLike] = useState([]);
  const [addNewPost, setAddNewPost] = useState("add to end");
  const [lastPostId, setLastPostId] = useState(0);

  console.log(addNewPost);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localLiked = localStorage.getItem("liked");
    if (localLiked === null) {
      localStorage.setItem("liked", "[]");
    } else {
      if (JSON.parse(localLiked).length > 0) {
        setHistoryLike(JSON.parse(localLiked));
      }
    }
  }, []);

  console.log(data.length);

  const handleClick = (id) => {
    var formdata = new FormData();
    formdata.append("actionName", "MessagesLoad");
    formdata.append("messageId", `${id}`);
    console.log("lastPostID", id);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    // "proxy": "http://f0665380.xsph.ru",

    fetch("", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Messages && result.Messages.length > 0) {
          if (addNewPost === "add to end") {
            setData([...data, ...result.Messages]);
          } else {
            setData([...result.Messages, ...data]);
          }
          console.log("Gelyan data: ", result.Messages);
          setLastPostId(result.Messages[result.Messages.length - 1].id);
        }
      })
      .catch((error) => console.log("error", error));
  };
  console.log("render");

  console.log("dashyndaky lastID: ", lastPostId);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("effectin ichinde:", lastPostId);
      handleClick(lastPostId);
    }, 5000);
    return () => clearInterval(interval);
  });

  const handleChangeClick = () => {
    if (addNewPost === "add to end") {
      setAddNewPost("add to front");
    } else {
      setAddNewPost("add to end");
    }
  };

  return (
    <div className="App">
      <button onClick={handleChangeClick}>{addNewPost}</button>

      {data?.map((item, index) => (
        <Item
          data={item}
          key={index}
          likedHitory={historyLike}
          setLikedHistory={setHistoryLike}
        />
        // <p key={index}>{item.author}</p>
      ))}
    </div>
  );
}

export default App;
