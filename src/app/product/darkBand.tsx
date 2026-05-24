export default function DarkBand() {

    const data = [
        {
            num: "48h",
            title: "Minimum cure time",
            body: "Every piece cures for at least 48 hours before it is touched. This is what gives concrete its weight and density."
        },
        {
            num: "11×",
            title: "Mould iterations",
            body: "The Humpback mould was refined eleven times before the form was considered right. The proportion you hold is not accidental."
        },
        {
            num: "01",
            title: "Person. Start to finish.",
            body: "Every Humpback is made entirely by one person — Mohit Vijh — from mould to sanding to packing. No production line. No outsourcing."
        }
    ]

    return (
        <div className="dark-band fu vis">
            {data.map((item: any) => (
                <div className="db-item">
                    <div className="db-num">{item.num}</div>
                    <div className="db-title">{item.title}</div>
                    <p className="db-body">{item.body}</p>
                </div>
            ))}
        </div>
    )
}