import React, { useState, useEffect } from "react";
import First from "./image/4.png";
import Second from "./image/3.png";
import Third from "./image/2.png";
// import Fourth from "./image/1.png";
import Profile from "./image/profile.png";
import MainImg from "./image/img.jpg";

import "./App.css";

const Item = ({ data, likedHitory, setLikedHistory }) => {
  const [text, setText] = useState("Далее");
  const [liked, setLiked] = useState(false);
  // console.log("data", data);

  useEffect(() => {
    let fineLiked = false;
    likedHitory.map((like) => {
      if (like.id === data.id) {
        fineLiked = true;
      }
    });

    if (fineLiked === true) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likedHitory]);

  const more = () => {
    if (text === "Далее") {
      setText("Свернуть");
    } else {
      setText("Далее");
    }
  };

  const likeIcon = () => {
    const localLikeds = JSON.parse(localStorage.getItem("liked"));

    if (liked) {
      const removeInLiked = likedHitory.filter((like) => like.id !== data.id);
      setLikedHistory(removeInLiked);
      const removeLocalLike = localLikeds.filter((elem) => elem.id !== data.id);
      localStorage.setItem("liked", JSON.stringify(removeLocalLike));
    } else {
      setLiked([...likedHitory, data]);
      localLikeds.push(data);
      localStorage.setItem("liked", JSON.stringify(localLikeds));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="profile">
          <img src={Profile} alt="" className="profile_img" />
          <div className="profile_name">
            <h3>{data.author}</h3>
            <p>{data.channel}</p>
          </div>
        </div>
        <div className="header_content">
          <div className="header_buttons">
            <button>Левый</button>
            <button>Центр</button>
            <button>Правый </button>
          </div>
          <div className="header_icons">
            <img src={First} className="img" alt="zsdf" />
            <img src={Second} className="img" alt="" />
            <img src={Third} className="img" alt="" />
            <span onClick={() => likeIcon()}>
              {liked ? icons.starFill : icons.star}
            </span>
          </div>
        </div>
      </div>
      <div className="content">
        <p className="time">{data.date.slice(11, 16)}</p>
        <div className="content_text">
          <p>{text === "Далее" ? data.content.slice(0, 200) : data.content}</p>
          {data.content.length > 200 ? (
            <p onClick={() => more()}>{text}</p>
          ) : null}
          {data.attachments.length > 0
            ? data.attachments.map((elem) => {
                if (elem.type === "video") {
                  return (
                    <video controls loop muted>
                      <source src={elem.url} type="video/mp4"></source>
                    </video>
                  );
                }
              })
            : null}
        </div>
      </div>
      <div className="hashtag">
        <a href="/">#Новое</a>
        <a href="/">#Эксперт</a>
      </div>
    </div>
  );
};

export default Item;

export const icons = {
  star: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width="22"
      height="20"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 22 20"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.074 2.633c.32-.844 1.531-.844 1.852 0l2.07 5.734a.99.99 0 0 0 .926.633h5.087c.94 0 1.35 1.17.611 1.743L18 14a.968.968 0 0 0-.322 1.092L19 20.695c.322.9-.72 1.673-1.508 1.119l-4.917-3.12a1 1 0 0 0-1.15 0l-4.917 3.12c-.787.554-1.83-.22-1.508-1.119l1.322-5.603A.968.968 0 0 0 6 14l-3.62-3.257C1.64 10.17 2.052 9 2.99 9h5.087a.989.989 0 0 0 .926-.633l2.07-5.734Z"
      />
    </svg>
  ),
  starFill: (
    <svg
      width="23"
      height="21"
      viewBox="0 0 23 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.3672 1.20312L7.82812 6.39844L2.08594 7.21875C1.07031 7.375 0.679688 8.625 1.42188 9.36719L5.52344 13.3906L4.54688 19.0547C4.39062 20.0703 5.48438 20.8516 6.38281 20.3828L11.5 17.6875L16.5781 20.3828C17.4766 20.8516 18.5703 20.0703 18.4141 19.0547L17.4375 13.3906L21.5391 9.36719C22.2812 8.625 21.8906 7.375 20.875 7.21875L15.1719 6.39844L12.5938 1.20312C12.1641 0.304688 10.8359 0.265625 10.3672 1.20312Z"
        fill="#0088EE"
      />
    </svg>
  ),
};
