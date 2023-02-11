import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const JoinVote = () => {

    const [code, setCode] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const navigate = useNavigate();

    const joinVote = () => {
       console.log(code);
       if (code.length <= 0) {
        setIsError(true);
       } else {
        setIsError(false);
        navigate("/vote/" + code);
       }
    }

    return (
        <div className="flex flex-col w-64 border-opacity-50">
            <article className="prose lg:prose-xl my-4">
                <h1>EatWhat?</h1>
                <p>
                    <b>Enter a code: </b>
                </p>
            </article>
            <div className={"tooltip " + (isError? "tooltip-open" : "")} data-tip="Enter a code">
                <input
                    type="text"
                    placeholder="Code"
                    className={
                        "input w-full max-w-xs mb-4 " +
                        (isError ? "input-error" : "")
                    }
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                    }}
                />
            </div>
            <button className="btn" onClick={joinVote}>
                Join Vote
            </button>
        </div>
    );
}