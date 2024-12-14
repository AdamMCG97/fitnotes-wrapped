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
        <div className="relative h-full flex flex-col justify-center items-center p-2">
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
                }
            </div>
        </div >
    )
}

export default Card;