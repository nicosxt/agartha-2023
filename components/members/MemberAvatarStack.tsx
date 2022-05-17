export default function MemberAvatarStack(props:any): any {
    const {membersInfo} = props;
    return membersInfo ? membersInfo.map((member:any) =><MemberItem member={member}/>) : null;
}


function MemberItem(props:any) {
    const {member} = props;
    return (
        <>
        <a href="#" className="text-sm font-medium text-gray-500">

         <img
          className="relative z-0 inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src={member.avatarUrl? member.avatarUrl : "https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg" }
          alt=""
        ></img>
        </a>
        {/* <p>{community.communityName}</p> */}
        </>
    );
}