export default function CategoryBanner() {

    return (
        <div className="cat-banner fu vis">
            <div className="cb-visual">
                <img src="http://localhost:8080/wp-content/uploads/2026/05/lg3.jpeg" alt="Category Banner" />
            </div>
            <div className="cb-copy">
                <div className="cb-label">The making</div>
                <h2 className="cb-hl">Cast in concrete.<br /><em>Finished by hand.</em><br />No two the same.</h2>
                <p className="cb-body">Every tissue holder begins as a handmade mould — shaped, poured, cured for 48 hours, then sanded by hand. The GIL mark is pressed into the base of each piece. The weight you feel when you hold it is the point.</p>
                <a href="greyinklab_story.html" className="btn-gl">Read the Story</a>
            </div>
        </div>
    );
}