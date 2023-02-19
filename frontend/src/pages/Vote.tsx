import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Vote = () => {
    const navigate = useNavigate();

    let { id } = useParams();

    interface Option {
        id: number;
        vote_id: number;
        name: string;
    }

    const [options, setOptions] = useState<Option[]>([])

    const [isCopied, setIsCopied] = useState<boolean>(false);

    // Get options from server
    const getOptions = (voteId: string | undefined) => { 
        if (voteId === undefined) return [];

        axios.get(import.meta.env.VITE_BACKEND_URL + "/voteOption/" + voteId)
        .then((res) => {
            setOptions(res.data.options);
        })
        .catch((err) => {console.error(err)});
    }

    // Vote a food
    const voteFood = (index: number) => {
        let option = options[index];

        axios.post(import.meta.env.VITE_BACKEND_URL + "/voteItem/" + option.id)
            .then((res) => {
                console.log(res.data);
                navigate("/vote/" + id + "/success");
            })
            .catch((err) => { console.error(err) });
    }

    // Generate options buttons
    const generateOption = () => {

        console.log(options)

        return options.map((option, index) => {
            return (
                <button
                    key={index}
                    className="btn mb-4 w-full max-w-xs"
                    onClick={()=>{ voteFood(index) }}
                >
                    {option.name}
                </button>
            );
        });
    }

    const randomVote = () => {
        let randomIndex = Math.floor(Math.random() * options.length);
        voteFood(randomIndex);
    }

    const shareLink = () => {
        // Copy URL to clipboard
        navigator.clipboard.writeText(window.location.href);

        // Show success message
        setIsCopied(true);
    }


    useEffect(() => {
        if (id === undefined) navigate("/");  // redirect to home page if id is undefined
        getOptions(id);
    }, []);
    

    return (
        <div className="flex flex-col w-64 border-opacity-50">
            <article className="prose lg:prose-xl my-4">
                <h1>EatWhat?</h1>
                <p>
                    <b>Vote a food: </b>
                </p>
            </article>
            {generateOption()}
            <button className="btn btn-primary" onClick={randomVote}>Randomly Choose One</button>
            <div className="divider">OR</div>
            <button className={"btn btn-secondary " + (isCopied ? "tooltip tooltip-bottom tooltip-open" : "")} data-tip="URL Copied" onClick={shareLink}>Copy URL to Share Vote</button>
            <article className="prose lg:prose-xl my-4">
            <small>Vote ID: {id}</small>
            </article>
        </div>
    );
};
