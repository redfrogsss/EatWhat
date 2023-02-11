import { Link } from "react-router-dom";

export const HomePage = () => {
    
    return (
        <div className="flex flex-col w-64 border-opacity-50">
            <article className="prose lg:prose-xl my-8">
                <h1>EatWhat?</h1>
            </article>
            <Link to="/new" className="btn">
                Start a new vote
            </Link>
            <div className="divider">OR</div>
            <Link to="/join" className="btn">
                Join existing vote
            </Link>
        </div>
    );
}