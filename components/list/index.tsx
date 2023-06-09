import Fuse from "fuse.js";
import { useCallback, useEffect, useMemo, useState } from "react";

import style from "./list.module.css";
import CommunityProfilePage from "../communities/CommunityProfilePage";

function Card(props: any) {
  const { community, onClick } = props;
  const clickCommunity = useCallback(
    (e) => {
      e.preventDefault();
      onClick(community);
    },
    [community]
  );
  return (
    <a
      key={community.slug}
      href={`/community/${community.slug}`}
      data-key={community.title}
      onClick={clickCommunity}
    >
      <div key={community.slug} className={style.card}>
        <div className={style.cardContent}>
          <div className={style.imageWrapper}>
            <img
              src={community.image}
              className="h-full w-full  object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div>
            <h3 className="text-md mt-4 font-bold font-inter text-[#0000FF] text-center">
              {community.title}
            </h3>
            <p className=" text-sm pt-2 font-inter text-[#0000FF] text-center">
              {community.country}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function CommunityList(props: any) {
  const { communities } = props;
  const [communityQuery, setCommunityQuery] = useState("");
  const [communityView, setCommunityView] = useState(null);

  const tags = useMemo(
    () =>
      Object.keys(
        communities.reduce((tagAcc: any, c: any) => {
          c.tags.forEach((tag: any) => {
            tagAcc[tag] = tagAcc[tag] ? tagAcc[tag] + 1 : 0;
          });
          return tagAcc;
        }, {})
      ),
    [communities]
  );

  const fuse = new Fuse(communities, {
    keys: ["name", "description", "tags", "country"],
  });
  let searchResults = null;

  if (communities) {
    const results = fuse.search(communityQuery);
    searchResults = communityQuery
      ? results.map((result: any) => result.item)
      : communities;
  }

  const handleOnSearch = useCallback(({ currentTarget = {} }: any) => {
    const { value } = currentTarget;
    setCommunityQuery(value);
  }, []);

  const changeQuery = useCallback((tag: string) => {
    setCommunityQuery(tag);
  }, [])

  const onClickCommunity = useCallback((community: any) => {
    setCommunityView(community);
    history.pushState({}, "", `/community/${community.slug}`);
  }, [])

  const closeCommunityModal = useCallback(() => {
    // console.log(communityView)
    if (communityView) {
      setCommunityView(null);
      history.pushState({}, "", "/?list=true");
    }
  }, [communityView]);

  useEffect(() => {
    const handleEsc = (event) => {
       if (event.keyCode === 27) {
        console.log('Close');
        closeCommunityModal();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [communityView]);

  useEffect(() => {
    if (communityView) {
      document.body.classList.add("modal");
      document.body.style.overflow = "hidden";
      return () => {
        document.body.classList.remove("modal");
        document.body.style.overflow = "auto";
      };
    }
    if (!communityView) {
      document.body.classList.remove("modal");
      document.body.style.overflow = "auto";
    }
  }, [communityView]);

  return (
    <div className="bg-white">
      <div
        onClick={closeCommunityModal}
        className={`${communityView ? style.communityView : ""}`}
      >
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 md:px-8 lg:max-w-7xl lg:px-8">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only "
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-[#0000FF] "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                value={communityQuery}
                onChange={handleOnSearch}
                id="default-search"
                className="block p-4 pl-10 w-full text-lg text-gray-900 bg-[#FFDDED] border border-2 border-[#0000FF] focus:ring-blue-500 focus:border-blue-500 placeholder:text-[#0000FF] placeholder:italic"
                placeholder="Search Keywords..."
                required
              />
            </div>
          </form>
          <div className="flex flex-wrap mt-8 mx-8 lg:mt-1 lg:ml-4 md:mx-5 md:mt-2 ">
            {tags.map((tag: any) => (
              <button
                className="mt-2 hover:scale-125 text-[#FFDDED] bg-[#0000FF] rounded-3xl py-1 px-4 font-mono font-medium lg:text-xl mr-2"
                onClick={() => changeQuery(tag)}
                key={tag}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
        <div className=" py-16 px-4 sm:py-2 sm:px-6 md:py-2 lg:max-w-full lg:px-0 lg:py-2 xl:py-2">
          <div className={style.cardGrid}>
            {searchResults &&
              searchResults.map((community: any) => (
                <Card
                  key={community.slug}
                  community={community}
                  onClick={onClickCommunity}
                />
              ))}
          </div>
        </div>
      </div>
      {!!communityView ? (
        <div className={style.communityModalWrapper}>
          <CommunityProfilePage
            onClick={closeCommunityModal}
            community={communityView}
          ></CommunityProfilePage>
        </div>
      ) : null}
    </div>
  );
}
