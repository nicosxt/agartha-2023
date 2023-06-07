import { authContext } from "../../lib/authContext";
import { updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { getAuth, onAuthStateChanged, signOut as signout } from "firebase/auth";
import { doc } from "firebase/firestore";
import { firestore } from "../../lib/firebaseConfig/init";

import { useRouter } from "next/router";
import CommunityAvatarUploader from "./CommunityAvatarUploader";
import { useState, useEffect, useRef } from "react";

import { TagsInput } from "react-tag-input-component";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";

export default function EditCommunityProfile(props: any) {
  const {
    communityRef,
    userCommunityRef,
    username,
    communityMemberRef,
    communityMemberSnap,
    defaultValues,
  } = props;
  const router = useRouter();
  const { register, handleSubmit, reset, watch, formState, setError } = useForm(
    { defaultValues, mode: "onChange" }
  );
  const mapContainer = useRef<any>(null);

  const map = useRef<mapboxgl.Map | null>(null);
  const [longitude2, setLongitude2] = useState<any>(defaultValues.longitude);
  const [latitude2, setLatitude2] = useState<any>(defaultValues.latitude);
  const [location2, setLocation2] = useState<any>(defaultValues.location);

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
      defaultValues.latitude = results.features[0].center[1];
      console.log("latitude", defaultValues.latitude);
      defaultValues.longitude = results.features[0].center[0];
      console.log("longitude", defaultValues.longitude);
      setLatitude2(defaultValues.latitude);
      setLongitude2(defaultValues.longitude);
      setLocation2(results.features[0].place_name);
    });
  }, []);

  useEffect(() => {}, [
    defaultValues.latitude,
    defaultValues.longitude,
    latitude2,
    longitude2,
    location2,
    defaultValues.location,
  ]);

  useEffect(() => {}, [defaultValues]);

  const updateCommunity = async (data: any) => {
    // console.log("is is ")
    const {
      communityName,
      tags,
      city,
      state,
      country,
      phone,
      facebook,
      discord,
      email,
      instagram,
      intro,
      twitter,
      website,
      wechat,
      longitude,
      latitude,
      label,
      github,
      location,
    } = data;
    // console.log(communityRef)
    await updateDoc(communityRef, {
      // Tip: give all fields a default value here
      communityName,
      label,
      // avatarUrl,
      longitude: longitude2,
      latitude: latitude2,
      location: location2,
      tags: tags
        .toString()
        .split(",")
        .map((tag: any) => tag.trim()),
      city,
      country,
      state,
      // slug,
      intro,
      instagram,
      twitter,
      website,
      github,
      wechat,
      facebook,
      discord,
      email,
      phone,
    });
    reset({
      communityName,
      phone,
      tags,
      city,
      state,
      country,
      discord,
      email,
      instagram,
      intro,
      twitter,
      website,
      wechat,
      facebook,
      longitude,
      location,
      latitude: latitude,
      github,
      label,
    });
    router.push(`/community/${defaultValues.slug}`);
  };
  return (
    <>
      <form
        className="space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmit(updateCommunity)}
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5 md:ml-10 pt-8">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Edit Community Profile📝
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
                Username
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  {...register("communityName")}
                  placeholder={defaultValues.communityName}
                  type="text"
                  id="username"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="intro"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Intro 👀
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    {...register("intro")}
                    id="intro"
                    rows={10}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  ></textarea>
                  <p className="mt-2 text-sm text-gray-500">
                    Tell us more about yourself!
                  </p>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Change Your Avatar{" "}
                </label>

                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <CommunityAvatarUploader
                          slug={defaultValues.slug}
                          defaultValues={defaultValues}
                        />
                      </div>
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
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="label"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                {" "}
                Tags{" "}
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  {...register("tags")}
                  name="tags"
                  // placeHolder="enter tags"
                />{" "}
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="label"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                {" "}
                Label{" "}
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  {...register("label")}
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
              className="w-full justify-center mx-60"
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
                  value={latitude2}
                  {...register("latitude")}
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
                  value={longitude2}
                  {...register("longitude")}
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
                Location{" "}
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  value={location2}
                  {...register("location")}
                  type="text"
                  name="location"
                  id="location"
                  autoComplete="address-level2"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
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
                  {...register("instagram")}
                  type="text"
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
                  {...register("twitter")}
                  type="text"
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
                  {...register("website")}
                  type="text"
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
                Discord/Slack Server{" "}
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  {...register("discord")}
                  type="text"
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
                  {...register("github")}
                  type="text"
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
                  {...register("wechat")}
                  type="text"
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
                  {...register("facebook")}
                  type="text"
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
                  {...register("email")}
                  type="text"
                  id="email"
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
                Phone
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  {...register("phone")}
                  type="text"
                  id="phone"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
            <DeleteCommunityButton
              username={username}
              communityMemberSnap={communityMemberSnap}
              communityRef={communityRef}
              userCommunityRef={userCommunityRef}
            />
          </div>
        </div>
      </form>
    </>
  );
}

function DeleteCommunityButton(props: any): any {
  const { communityRef, communityMemberSnap, userCommunityRef, username } =
    props;
  const router = useRouter();
  const deletePost = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      await deleteDoc(communityRef);
      await deleteDoc(userCommunityRef);
      communityMemberSnap.docs.map(async (d: any) => {
        await deleteDoc(d.ref);
        const uid = d.data().uid;
        const slug = d.data().slug;
        const userCommunityRef = doc(
          firestore,
          "users",
          uid,
          "communities",
          slug
        );
        await deleteDoc(userCommunityRef);
      });

      router.push(`/${username}/community`);
    }
  };
  return (
    <button
      type="button"
      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={deletePost}
    >
      Delete Community
    </button>
  );
}
