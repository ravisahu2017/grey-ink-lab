import '@/app/globals.css';
import './category.css';

export default function Category({ category1, category2 }: { category1: any, category2: any }) {
    return (
        <section id="editorial">
            {category1 && <div className="ed-panel tissue">
                <div className="ed-visual">
                    <img src={category1.image?.src} alt={category1.name} />
                </div>
                <div className="ed-copy">
                    <div className="ed-step">Everyday Objects, Reimagined</div>
                    <h2 className="ed-headline">A quiet<br />ritual,<br />held in<br />concrete</h2>
                    <p className="ed-body">You reach for it without thinking. We made it worth noticing. Each sculptural tissue holder is <strong>cast in concrete, shaped by hand</strong>, and designed to hold quiet presence on your desk, your bedside, your bathroom counter — wherever it lives with you.</p>
                    <a href="#" className="btn-outline-ink">Discover Tissue Holders</a>
                </div>
            </div>}
            {category2 && <div className="ed-panel lamps">
                <div className="ed-copy">
                    <div className="ed-step">Light, Shaped by Hand</div>
                    <h2 className="ed-headline">Light as<br />an object<br />in its<br />own right</h2>
                    <p className="ed-body">Switch it off — it still belongs in the room. Our lamps are <strong>designed as objects first</strong>, light sources second. The weight in your hand, the curve of the form, the surface left rough on purpose. Soft illumination meets sculptural intention.</p>
                    <a href="#" className="btn-outline-ink">Discover Lamps</a>
                </div>
                <div className="ed-visual">
                    <img src={category2.image?.src} alt={category2.name} />
                </div>
            </div>}
        </section>
    )

}