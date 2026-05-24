export default function HowItsMade() {
    const stepData = [
        {
            number: "01",
            title: "The Mould",
            description: "Each form begins as a handmade mould — shaped, refined, and tested across multiple pours until the proportion feels right. The Humpback mould took eleven iterations."
        },
        {
            number: "02",
            title: "The Pour",
            description: "Concrete is mixed by hand to a specific consistency and poured slowly. Trapped air is worked out manually. Each pour takes around 20 minutes per piece."
        },
        {
            number: "03",
            title: "The Cure",
            description: "Each piece cures for a minimum of 48 hours before demoulding. Rushed curing causes cracking. The weight you feel when you hold it comes from this full cure."
        },
        {
            number: "04",
            title: "The Finish",
            description: "Surface is hand-sanded progressively. The GIL mark is pressed into the base. A matte sealer is applied. The piece is photographed and inspected before packing."
        }
    ];

    return (
        <section className="process-section fu vis">
            <div className="process-header">
                <h2 className="process-hl">How it's<br /><em>made.</em></h2>
                <div className="process-sub">Four steps.<br />48 hours minimum.<br />One person.</div>
            </div>
            <div className="process-steps">
                {stepData.map((step: any, index: number) => (
                    <div className="step" key={index}>
                        <div className="step-num">{step.number}</div>
                        <div className="step-title">{step.title}</div>
                        <p className="step-desc">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}