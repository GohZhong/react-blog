import './header.css'

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">React & Node</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img src="https://wallup.net/wp-content/uploads/2016/01/84855-nature-sunset-grass.jpg" alt="Scenery" className="headerimg" />
        </div>
    )
}
