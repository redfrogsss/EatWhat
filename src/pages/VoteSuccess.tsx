import { useParams, useNavigate } from "react-router-dom";

export const VoteSuccess = () => {
    const navigate = useNavigate();

    let { id } = useParams();

    return (
        <div className="flex flex-col w-64 border-opacity-50">
            <article className="prose lg:prose-xl my-4">
                <h1>EatWhat?</h1>
                <p>
                    <b>Thanks for the vote.</b>
                </p>
                <div className="divider"></div>
                <p>
                    <b>Vote Result:</b>
                </p>
            </article>
            <div className="stats stats-vertical shadow">
                <div className="stat">
                    <div className="stat-title">Total Vote</div>
                    <div className="stat-value">89,400</div>
                </div>
                <div className="stat">
                    <div className="stat-title">1st</div>
                    <div className="stat-value">
                        <div className="block my-2">
                            <p>Food 2</p>
                            <progress
                                className="progress progress-primary"
                                value="90"
                                max="100"
                            />
                        </div>
                    </div>
                    <div className="stat-desc">91% of you voted</div>
                </div>
                <div className="stat">
                    <div className="stat-title">2nd</div>
                    <div className="stat-value">
                        <div className="block my-2">
                            <p>Food 1</p>
                            <progress
                                className="progress progress-primary"
                                value="10"
                                max="100"
                            />
                        </div>
                    </div>
                    <div className="stat-desc">11% of you voted</div>
                </div>
            </div>
            <article className="prose lg:prose-xl my-4">
            <small>Vote ID: {id}</small>
            </article>
        </div>
    );
}