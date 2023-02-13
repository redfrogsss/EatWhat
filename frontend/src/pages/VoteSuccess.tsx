import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const VoteSuccess = () => {
    const navigate = useNavigate();

    let { id } = useParams();
    
    const [voteOptions, setVoteOptions] = useState<VoteOption[]>([]);

    interface VoteOption {
        id: number;
        vote_id: number;
        name: string;
        vote_count?: number;
    }

    const getVoteOptions = () => {
        let options: VoteOption[] = [];
        axios.get(import.meta.env.VITE_BACKEND_URL + "/voteOption/" + id)
            .then((res) => {
                options = res.data.options;
                setVoteOptions(options);

            })
            .catch((err) => {
                console.error(err);
            });
    };

    const getVoteResult = (option_id: string) => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/voteItem/" + option_id)
            .then((res) => { 
                let count = res.data.voteItem.length;
                let options = voteOptions;
                options.forEach((option: VoteOption, index: number) => {
                    if (option.id.toString() === option_id) {
                        options[index].vote_count = count;
                    }
                }
                );
                
                setVoteOptions(options);
             })
            .catch((err) => { console.error(err) });
    }

    useEffect(() => {
        getVoteOptions();
    }, [])

    useEffect(() => {
        voteOptions.forEach(option => {
            getVoteResult(option.id.toString());
    }); }, [voteOptions])

    const getTotalCount = () => {
        let total = 0;
        voteOptions.forEach(option => {
            if(option.vote_count != undefined) {
                total += option.vote_count;
            }
        });
        return total;
    }

    const FoodResult = (rank: number, food: string, percentage: number) => {
        return (
            <div className="stat" key={rank - 1}>
                <div className="stat-title">No. {rank}</div>
                <div className="stat-value">
                    <div className="block my-2">
                        <p>{food}</p>
                        <progress
                            className="progress progress-primary"
                            value={percentage}
                            max="100"
                        />
                    </div>
                </div>
                <div className="stat-desc">{percentage}% of you voted {food}</div>
            </div>
        );
    }

    const generateFoodResult = () => {
        return voteOptions.map((option, index) => {
            let totalCount: number = getTotalCount();
            let percentage: number = totalCount === 0 ? 0 : Math.round((option.vote_count ?? 0) / totalCount * 100);
            return FoodResult(index + 1, option.name, percentage);
        });
    }
    

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
                    <div className="stat-value">{ getTotalCount() }</div>
                </div>

                { generateFoodResult() }

                {/* <div className="stat">
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
                </div> */}

                {/* <div className="stat">
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
                </div> */}
            </div>
            <article className="prose lg:prose-xl my-4">
            <small>Vote ID: {id}</small>
            </article>
        </div>
    );
}