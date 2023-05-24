import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './CommunityProfilePage.module.css'

/*
    todo: remove tailwind
    todo: make tags links to community list filter page
    todo: make this an overlay on the map
*/

export default function CommunityProfilePage(props: any) {
  const community = props.community;
  return (
    <div className={styles.outerWrapper}>
      <img className={styles.cross} src='/community/cross.png' />
      <div className={styles.wrapper}>

        <div className={styles.imageLinkContainer}>
          <div >
            <img src={community.image ? community.image : "https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg"} alt="" />
          </div>
          {community.url &&
            <a target="_blank" rel="noreferrer" href={community.url}>
              <img src='/icons/Icon-link.png' />
            </a>
          }
        </div>
        <div className={styles.container}>
          <h1 className={styles.title}>{community.title}</h1>
          <img className={styles.line} src='/community/line.png' />
          {community.tags &&
            <div className={styles.tags}>
              {community.tags.map((tag: any) => (
                <span className={styles.tag} key={tag}>#{tag}</span>
              ))}
            </div>
          }
          <div className={styles.location}>
            <img className={styles.pin} src='/community/pin.png' />
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