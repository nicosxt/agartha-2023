import { useAuth, signOut } from "../../lib/authContext";
import Dashboard from "../users/Dashboard";
import { useEffect, useState } from "react";
import { getUserWithUsername } from "../../lib/firebaseConfig/init";
import { memberToJSON } from "../../lib/firebaseConfig/init";
type Props = {
  children: React.ReactNode;
};

export default function Header({ children }: Props) {
  const { user, username, loading } = useAuth();
  const [realUser, setRealUser] = useState<any>(null);
  let realUsername: string = username!;
  let userDoc;

  useEffect(() => {
    const getUser = async () => {
      const userDoc = await getUserWithUsername(realUsername);
      if (userDoc) {
        const currentUser = memberToJSON(userDoc);
        setRealUser(currentUser);
      }
    };
    getUser();
  }, [userDoc]);

  return (
    <>
      {realUser && username ? (
        <>
          <Dashboard user={realUser} username={username}>
            {children}{" "}
          </Dashboard>
        </>
      ) : null}
    </>
  );
}
