import Marquee from './Marquee.jsx';

const Item = ({ plus }) => (
  <span className="tmarquee__item">
    SYNTHWEB<em aria-hidden="true">{plus ? '+' : '✳'}</em>
  </span>
);

const Row = () => (
  <>
    <Item /><Item plus /><Item /><Item /><Item plus /><Item />
  </>
);

export default function TextMarquee() {
  return (
    <section className="tmarquee" aria-hidden="true">
      <Marquee speed={70} dir={-1}><Row /></Marquee>
      <Marquee speed={70} dir={1}><Row /></Marquee>
    </section>
  );
}
