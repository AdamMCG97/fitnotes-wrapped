interface ListProps {
    items: { description: string, statistic: string }[]
    limit: number
}

const List = (props: ListProps) => {
    return (
        <div className="flex flex-col">
            {props.items.slice(0, props.limit).map((item) => {
                return (<div>
                    <div className="border-t border-slate-200">
                        <div className="w-full flex justify-center items-center py-5 text-slate-800">
                            <span>{item.description} - {item.statistic}</span>
                        </div>
                    </div>
                </div>)
            })
            }
        </div>
    )
}

export default List;