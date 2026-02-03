import { twMerge } from "tailwind-merge";
import Marquee from "../components/Marquee";
import { reviews } from "../constants";

const sampleReviews = [
  {
    name: "Product Lead",
    username: "FinTech",
    body: "Delivered a production-grade dashboard with measurable performance gains.",
    img: "/assets/socials/linkedin.svg",
  },
  {
    name: "Founder",
    username: "SaaS",
    body: "Amazing UX polish and reliable engineering across the stack.",
    img: "/assets/socials/github.svg",
  },
  {
    name: "Engineering Manager",
    username: "AI Team",
    body: "Built a scalable AI pipeline and an intuitive interface for users.",
    img: "/assets/socials/github.svg",
  },
];

const data = reviews.length ? reviews : sampleReviews;
const firstRow = data.slice(0, Math.ceil(data.length / 2));
const secondRow = data.slice(Math.ceil(data.length / 2));

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={twMerge(
        "relative h-full w-full sm:w-72 cursor-pointer overflow-hidden rounded-xl border p-4 border-white/10 bg-white/5 hover:bg-white/10 transition focus-ring"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full bg-white/10 p-1 flex-shrink-0"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col min-w-0">
          <figcaption className="text-xs sm:text-sm font-medium text-white truncate">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-white/40 truncate">{username}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">{body}</blockquote>
    </figure>
  );
};

export default function Testimonial() {
  return (
    <section className="section c-space">
      <div>
        <h2 className="section-title">Testimonials</h2>
        <p className="section-subtitle">
          Trusted by teams and founders to deliver quality and speed.
        </p>
      </div>
      <div className="relative flex flex-col items-center justify-center w-full mt-10 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username + review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username + review.name} {...review} />
          ))}
        </Marquee>
        <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none bg-gradient-to-r from-black/60"></div>
        <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none bg-gradient-to-l from-black/60"></div>
      </div>
    </section>
  );
}
