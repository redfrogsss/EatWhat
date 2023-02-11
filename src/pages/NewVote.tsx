import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewVote = () => {

    const [items, setItems] = useState<string[]>(["", ""])

    const navigate = useNavigate();

    const generateItem = () => {
        return items.map((item, index) => {
            return (
                <input
                    type="text"
                    key={index}
                    placeholder={"Food " + (parseInt(index) + 1)}
                    className="input w-full max-w-xs mb-4"
                    value={item}
                    onChange={(e) => {
                        const newItems = [...items];
                        newItems[index] = e.target.value;
                        setItems(newItems);
                    }}
                />
            );
        });
    }

    const newItem = () => {
        const newItems = [...items];
        newItems.push("");
        setItems(newItems);
    }

    const startVote = () => {
        // check the items
        let voteItems = items.filter(item => item.length > 0);
        if(voteItems.length == 0) {
            setItems(["", ""])
            console.log("No items");
        }

        console.log(items);

        navigate("/vote/abc")
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