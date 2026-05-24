export default function MaterialSection() {
    return (
        <section className="material-section fu">
            <div className="mat-visual">
                <img src="http://localhost:8080/wp-content/uploads/2026/05/a1.jpeg" alt="" />
            </div>
            <div className="mat-copy">
                <div className="mat-label">Material & Making</div>
                <h2 className="mat-hl">Cast in concrete.<br /><em>Finished by hand.</em><br />Marked for life.</h2>
                <p className="mat-body">The Humpback begins as a mould — shaped and refined over multiple pours until the form is right. Concrete is mixed by hand, poured slowly, and left to cure for 48 hours. What comes out is sanded, sealed, and pressed with the GIL mark at its base. No two pieces are identical. The irregularities in surface are not imperfections — they are the proof of how it was made.</p>
                <div className="mat-specs">
                    <div className="spec-row">
                        <span className="spec-key">Material</span>
                        <span className="spec-val">Cast concrete, matte sealed</span>
                    </div>
                    <div className="spec-row">
                        <span className="spec-key">Dimensions</span>
                        <span className="spec-val">24 × 14 × 9 cm</span></div>
                    <div className="spec-row">
                        <span className="spec-key">Weight</span>
                        <span className="spec-val">~1.4 kg</span>
                    </div>
                    <div className="spec-row">
                        <span className="spec-key">Origin</span>
                        <span className="spec-val">Made in Delhi, India</span>
                    </div>
                    <div className="spec-row">
                        <span className="spec-key">Edition</span>
                        <span className="spec-val">Open edition, made to order</span>
                    </div>
                    <div className="spec-row">
                        <span className="spec-key">Maker</span>
                        <span className="spec-val">Mohit Vijh, Greyinklab</span>
                    </div>
                </div>
            </div>
        </section>
    )
}