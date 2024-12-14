import { useEffect, useState } from "react";
import { Database } from "sql.js";
import SingleFileUploader from "./FileUploader";
import Heading from "./Heading";
import { WrappedMetrics } from "../domain/WrappedMetrics";
import { calculateMetrics } from "../service/MetricsCalculationService";
import DisplayMetrics from "./DisplayMetrics";
import LoadingIcon from "./LoadingIcon";

const App = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [database, setDatabase] = useState<Database | null>(null);
    const [metrics, setMetrics] = useState<WrappedMetrics | null>(null);

    useEffect(() => {
        if (database) {
            const calcedMetrics = calculateMetrics(database);
            console.log(calcedMetrics);
            setMetrics(calcedMetrics)
        }
    }, [database])

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center w-full p-5">
                <Heading />
            </div>
            <div className={"flex justify-center w-full".concat((isLoading || database !== null) ? "hidden" : "")}>
                <SingleFileUploader setIsLoading={setIsLoading} setDatabase={setDatabase} setMetrics={setMetrics} />
            </div>
            <div className="flex justify-center items-center">
                {
                    isLoading && <LoadingIcon />
                }
                {
                    metrics && <DisplayMetrics metrics={metrics} />
                }
            </div>
        </div>
    )

}

export default App;