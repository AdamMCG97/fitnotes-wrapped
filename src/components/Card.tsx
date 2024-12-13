import { ReactNode } from "react";

interface CardProps {
    group?: string;
    icon: ReactNode;
    headline: string;
    subheading: string;
    list?: ReactNode;
}

const Card = (props: CardProps) => {

    const { group, icon, headline, subheading, list } = props;

    return (
        <div className="relative min-h-80 w-full flex flex-col justify-center items-center my-6 bg-white shadow-sm border border-slate-200 rounded-lg p-2">
            {
                group &&
                <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                    <span className="text-sm text-slate-600 font-medium">
                        {group}
                    </span>
                </div>
            }
            <div className="p-3 text-center">
                <div className="flex justify-center mb-4">
                    {icon}
                </div>
                <div className="flex justify-center mb-2">
                    <h5 className="text-slate-800 text-2xl font-semibold">
                        {headline}
                    </h5>
                </div>
                <p className="block text-slate-600 leading-normal font-light mb-4 max-w-lg whitespace-pre-line">
                    {subheading}
                </p>
                {
                    list
                    // <div className="text-center">
                    //     <button className="min-w-32 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                    //         View More
                    //     </button>
                    // </div>
                }
            </div>
        </div >
    )
}

export default Card;