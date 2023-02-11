import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Vote = () => {
    const navigate = useNavigate();

    let { id } = useParams();

    const [options, setOptions] = useState<string[]>([])

    // Get options from server
    const getOptions = () => { return [] }

    const generateOption = () => {
        return options.map((option, index) => {
            return (
                <button
                    key={index}
                    className="btn"
                    onClick={()=>{}}
                >
                    {option}
                </button>
            );
        });
    }

    useEffect(() => {
        setOptions(getOptions);
    }, []);
    

    return (
        <div className="flex flex-col w-64 border-opacity-50">
            <article className="prose lg:prose-xl my-4">
                <h1>EatWhat?</h1>
                <p>
                    <b>Vote a food: </b>
                </p>
            </article>
            <button className="btn" onClick={()=>{navigate("/vote/" + id + "/success")}}>Food 1</button>
            {generateOption()}
            <div className="divider">OR</div>
            <button className="btn btn-primary">Randomly Choose One</button>
            <article className="prose lg:prose-xl my-4">
            <small>Vote ID: {id}</small>
            </article>
        </div>
    );
};
