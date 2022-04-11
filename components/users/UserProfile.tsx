interface Props {
    user: any
}
export default function UserProfilePage(props: Props): any {
    const { user} = props;


    return (
        <div className="box-center">
            <img src={user.photoURL || '/hacker.png'} className="card-img-center" />
            <p>
            <i>@{user.username}</i>
            </p>
            <h1>{user.displayName || 'Anonymous User'}</h1>
    </div>
    )
}