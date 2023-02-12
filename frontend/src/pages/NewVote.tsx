import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewVote = () => {

    const [items, setItems] = useState<string[]>(["", ""])
    const [isError, setIsError] = useState<boolean>(false);

    const navigate = useNavigate();

    const generateItem = () => {
        return items.map((item, index) => {
            return (
                <div className={"tooltip " + (isError && index == 0 ? "tooltip-open" : "")} data-tip="Enter a food option." key={index}>
                    <input
                        type="text"
                        key={index}
                        placeholder={"Food " + (parseInt(index) + 1)}
                        // className="input w-full max-w-xs mb-4"
                        className={
                            "input w-full max-w-xs mb-4 " +
                            (isError ? "input-error" : "")
                        }
                        value={item}
                        onChange={(e) => {
                            const newItems = [...items];
                            newItems[index] = e.target.value;
                            setItems(newItems);
                        }}
                    />
                </div>
            );
        });
    }

    const newItem = () => {
        const newItems = [...items];
        newItems.push("");
        setItems(newItems);
    }

    const startVote = () => {
        let options = items.filter(item => item.length > 0);

        // check the items
        if (options.length == 0) {
            setItems(["", ""])
            setIsError(true);
            return;
        }

        // send the request to backend
        axios.post(import.meta.env.VITE_BACKEND_URL + "/vote", {})
            .then((res) => {
                let voteId = res.data.vote_id;

                axios.post(import.meta.env.VITE_BACKEND_URL + "/voteOption/" + voteId, { options })
                    .then((res) => {
                        navigate("/vote/" + voteId);
                    })
                    .catch((err) => { console.error(err) });
            })
            .catch((err) => { console.error(err) });
    }

    return (
        <div className="flex flex-col w-64 border-opacity-50">
            <article className="prose lg:prose-xl my-4">
                <h1>EatWhat?</h1>
                <p><b>Start a New Vote:</b></p>
            </article>
            {generateItem()}
            <button className="btn btn-primary" onClick={newItem}>New Item</button>
            <div className="divider">OR</div>
            <button className="btn" onClick={startVote}>Start Vote</button>
        </div>
    );
}