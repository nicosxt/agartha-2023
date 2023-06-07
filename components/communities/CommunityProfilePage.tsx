import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./CommunityProfilePage.module.css";

/*
    todo: remove tailwind
    todo: make tags links to community list filter page
    todo: make this an overlay on the map
*/

export default function CommunityProfilePage(props: any) {
  const community = props.community;
  return (
    <div className={styles.outerWrapper}>
      <img
        onClick={props.onClick}
        className={styles.cross}
        src="/community/cross.png"
      />
      <div className={styles.wrapper}>
        <div className={styles.imageLinkContainer}>
          <div className={styles.image}>
            <img
              src={
                community.image
                  ? community.image
                  : "https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg"
              }
              alt=""
            />
          </div>
        </div>
        <div className={styles.container}>
          <h1 className={styles.title}>{community.title}</h1>
          {community.url && (
            <a
              className={styles.link}
              target="_blank"
              rel="noreferrer"
              href={community.url}
            >
              {community.url}
            </a>
          )}
          <div className={styles.line} />
          {community.tags && (
            <div className={styles.tags}>
              {community.tags.map((tag: any) => (
                <span className={styles.tag} key={tag}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className={styles.location}>
            <svg
              className="flower"
              width="15"
              height="23"
              viewBox="0 0 15 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.48 7.05153C14.48 10.9097 9.39724 22.15 7.42482 22.15C5.4524 22.15 0.369629 10.9097 0.369629 7.05153C0.369629 3.19335 3.52835 0.0656738 7.42482 0.0656738C11.3213 0.0656738 14.48 3.19335 14.48 7.05153Z"
                fill="#0000FF"
              />
              <ellipse
                cx="7.42492"
                cy="7.69486"
                rx="5.03942"
                ry="4.8184"
                fill="#FFDDED"
              />
            </svg>
            <p className={styles.country}>{community.country}</p>
          </div>
          <div className={styles.description}>
            <p className={styles.text}>
              <ReactMarkdown>{community.description}</ReactMarkdown>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
