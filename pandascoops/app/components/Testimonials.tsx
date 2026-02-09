"use client";
import { TestimonialsColumn } from "./testimonials-columns";

const testimonials = [
	{
	text: "The flavors are unbelievably creamy and fresh. Every visit feels like a little celebration.",
	image: "https://randomuser.me/api/portraits/women/1.jpg",
	name: "Briana Patton",
	role: "Regular Customer",
},
{
	text: "I love how many unique flavors they have. There’s always something new to try, and it never disappoints.",
	image: "https://randomuser.me/api/portraits/men/2.jpg",
	name: "Bilal Ahmed",
	role: "Ice Cream Lover",
},
{
	text: "The staff is super friendly and always helps me pick the perfect scoop. Amazing service every time.",
	image: "https://randomuser.me/api/portraits/women/3.jpg",
	name: "Saman Malik",
	role: "Happy Customer",
},
{
	text: "Hands down the best ice cream in town. The quality and taste keep me coming back.",
	image: "https://randomuser.me/api/portraits/men/4.jpg",
	name: "Omar Raza",
	role: "Local Customer",
},
{
	text: "Their ice cream is rich, smooth, and full of flavor. You can tell it’s made with care.",
	image: "https://randomuser.me/api/portraits/women/5.jpg",
	name: "Zainab Hussain",
	role: "Dessert Enthusiast",
},
{
	text: "I brought my family here and everyone loved it. Perfect spot for a sweet treat together.",
	image: "https://randomuser.me/api/portraits/women/6.jpg",
	name: "Aliza Khan",
	role: "Family Customer",
},
{
	text: "Great atmosphere, great flavors, and great value. It’s my go-to ice cream place now.",
	image: "https://randomuser.me/api/portraits/men/7.jpg",
	name: "Farhan Siddiqui",
	role: "Frequent Visitor",
},
{
	text: "The seasonal flavors are incredible. You can really tell they put thought into every recipe.",
	image: "https://randomuser.me/api/portraits/women/8.jpg",
	name: "Sana Sheikh",
	role: "Flavor Explorer",
},
{
	text: "Ordering was easy and the ice cream was perfectly packed. Tasted just as good at home.",
	image: "https://randomuser.me/api/portraits/men/9.jpg",
	name: "Hassan Ali",
	role: "Takeaway Customer",
},
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
	return (
		<section className="relative py-10">
			<div className="mx-auto max-w-5xl">
				<div className="mx-auto flex max-w-full flex-col items-center justify-center gap-4">
					<div className="flex justify-center">
						<div className="rounded-lg border px-4 py-1">Testimonials</div>
					</div>

					<h2 className="font-bold text-3xl tracking-tighter lg:text-4xl">
						What our Customers say
					</h2>
					<p className="text-center text-muted-foreground text-sm">
						See what our customers have to say about us.
					</p>
				</div>

				<div className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
					<TestimonialsColumn duration={16} testimonials={firstColumn} />
					<TestimonialsColumn
						className="hidden md:block"
						duration={20}
						testimonials={secondColumn}
					/>
					<TestimonialsColumn
						className="hidden lg:block"
						duration={18}
						testimonials={thirdColumn}
					/>
				</div>
			</div>
		</section>
	);
}
