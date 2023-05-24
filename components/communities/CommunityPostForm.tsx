import React from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useState, useEffect, useRef } from "react";

import { authContext } from "../../lib/authContext";
import { getAuth, onAuthStateChanged, signOut as signout } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../lib/firebaseConfig/init";
import CommunityAvatarUploader from "./CommunityAvatarUploader";
import Link from "next/link";
import { TagsInput } from "react-tag-input-component";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
export default function CommunityPostForm(props: any) {
  const [tags, setTags] = useState<string[]>([]);

  const router = useRouter();
  const { username } = useContext(authContext);
  // Set values
  const [communityName, setCommunityName] = useState("");
  const [intro, setIntro] = useState("");

  //Set addresses
  const [label, setLabel] = useState("");

  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [location, setLocation] = useState("");

  //Social Media
  const [instagram, setInstagram] = useState("");
  const [wechat, setWechat] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [discord, setDiscord] = useState("");
  const [facebook, setFacebook] = useState("");

  const { slug } = props;
  console.log("slug is 111 ", slug);

  const auth = getAuth();
  const uid: string = auth?.currentUser?.uid!;

  const createCommunity = async (e: any) => {
    //create community and update user profile
    e.preventDefault();
    const ref = doc(firestore, "communities", slug);
    await setDoc(
      ref,
      {
        // Tip: give all fields a default value here
        communityName,
        // avatarUrl,
        tags,
        longitude,
        latitude,
        location,
        label,
        city,
        country,
        state,
        slug,
        intro,
        instagram,
        twitter,
        website,
        github,
        wechat,
        discord,
        email,
        phone,
        facebook,
      },
      { merge: true }
    );

    router.push(`/community/${slug}`);
  };
  const mapContainer = useRef<any>(null);

  const map = useRef<mapboxgl.Map | null>(null);

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? "";
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-79.4512, 43.6568],
      zoom: 13,
    });
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
    });
    map.current?.addControl(geocoder);
    geocoder.on("results", function (results) {
      console.log(results);
      console.log("coordinates", results.features[0].center);
      setLongitude(results.features[0].center[0]);
      setLatitude(results.features[0].center[1]);
      setLocation(results.features[0].place_name);
    });
  }, []);

  useEffect(() => {}, [latitude, longitude, location]);

  return (
    <>
      <form
        className="py-10 space-y-8 divide-y divide-gray-200"
        onSubmit={createCommunity}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Community Form 📝
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="communityName"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                {" "}
                Community Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  value={communityName}
                  onChange={(e) => setCommunityName(e.target.value)}
                  placeholder="My Community"
                  type="text"
                  name="communityName"
                  id="communityName"
                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Description 👀
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  {/* <textarea {...register("content")}  */}
                  <textarea
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                    // {...register("content")}
                    id="about"
                    name="about"
                    rows={10}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  ></textarea>
                  <p className="mt-2 text-sm text-gray-500">
                    Write a few sentences about your community.
                  </p>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Community Logo/Avatar{" "}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-gray-600">
                          <CommunityAvatarUploader
                            slug={slug}
                            defaultValues={null}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Details
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Getting to know more about the specifications.
                  </p>
                </div>

                <TagsInput
                  value={tags}
                  onChange={setTags}
                  name="tags"
                  placeHolder="enter tags"
                />
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="label"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    {" "}
                    label{" "}
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      type="text"
                      name="label"
                      id="label"
                      autoComplete="address-level2"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="pt-10"></div>

                <div
                  className="w-full justify-center "
                  style={{ width: 500, height: 500 }}
                  ref={mapContainer}
                />

                <div className="pt-40"></div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="latitude"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    {" "}
                    Latitude{" "}
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      type="text"
                      name="latitude"
                      id="latitude"
                      autoComplete="address-level2"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="longitude"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    {" "}
                    Longitude{" "}
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      type="text"
                      name="longitude"
                      id="longitude"
                      autoComplete="address-level2"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    {" "}
                    location{" "}
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      type="text"
                      name="location"
                      id="location"
                      autoComplete="address-level2"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Contact
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Let us connect!
                </p>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Instagram{" "}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    type="text"
                    name="instagram"
                    id="instagram"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="twitter"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Twitter{" "}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    type="text"
                    name="twitter"
                    id="twitter"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Website{" "}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    type="text"
                    name="website"
                    id="website"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="discord"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Discord
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={discord}
                    onChange={(e) => setDiscord(e.target.value)}
                    type="text"
                    name="discord"
                    id="discord"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="github"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Github
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    type="text"
                    name="github"
                    id="github"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="wechat"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  WeChat
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={wechat}
                    onChange={(e) => setWechat(e.target.value)}
                    type="text"
                    name="wechat"
                    id="wechat"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Facebook
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    type="text"
                    name="facebook"
                    id="facebook"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Email
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    name="email"
                    id="email"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Phone
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    name="phone"
                    id="phone"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <Link href={`/${username}/community/manage`} legacyBehavior>
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </Link>
            {/* <Link href={`/community/${slug}`}> */}
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create New Community
            </button>
            {/* </Link> */}
          </div>
        </div>
      </form>
    </>
  );
}
