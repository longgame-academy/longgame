/**
 * The parent review library.
 *
 * Every review on the site comes from this file: the homepage shows
 * HOMEPAGE_REVIEWS, the Parent Academy page shows ACADEMY_REVIEWS, and /reviews
 * shows ALL_REVIEWS — the complete library, including the ones featured on the
 * other two pages in shortened form.
 *
 * Copy rules that apply to anything added here:
 *  - No reviewer is quoted naming Shawn or Shawn Dixon. If a source does,
 *    recast the sentence lightly and keep the meaning.
 *  - Grammar and punctuation cleanup only. Never make a reviewer sound more
 *    enthusiastic or more certain than the original, and never join unrelated
 *    sentences together in a way that changes what they said.
 *  - Use the name as given. An anonymous source is "Sports Parent".
 *  - Name only. No role or caption line under a reviewer, anywhere.
 *  - No dates, no review-format labels, no marketplace branding of any kind.
 */
export type Review = {
  /** Only the /reviews library entries carry a title; some have none. */
  title?: string;
  quote: string;
  name: string;
};

/** The four reviews in "What Parents Are Saying" on the homepage. */
export const HOMEPAGE_REVIEWS: Review[] = [
  {
    quote:
      "It shows how to support young athletes with high standards while still making sure they know their worth is not tied to their performance.",
    name: "Tony Christensen",
  },
  {
    quote:
      "The insights are practical and relatable, offering guidance that will undoubtedly change how I approach conversations with my kids.",
    name: "David Charles",
  },
  {
    quote:
      "Realistic, practical advice that actually makes sense — no fluff. Common-sense strategies to build confidence, keep kids loving the game, and avoid the common burnout traps.",
    name: "Pierre Saucier",
  },
  {
    quote:
      "I wish I had this years ago. It would have changed a lot of things for my relationship with my kids.",
    name: "Sports Parent",
  },
];

/** The two reviews in "From Parents" on the Parent Academy page. */
export const ACADEMY_REVIEWS: Review[] = [
  {
    quote:
      "The message is not about lowering standards. It is about creating an environment where kids can be challenged, held accountable, and still know their worth is not tied to their performance.",
    name: "Mike Hosein",
  },
  {
    quote:
      "This was very helpful in understanding what my son needs from me during that “long car ride home” and, longer term, what he needs to feel supported.",
    name: "Andrea B.",
  },
];

/**
 * The full library, rendered by /reviews. Names repeat here (several reviewers
 * are anonymous, and one wrote twice), so anything mapping over this list must
 * key by index rather than by name.
 */
export const ALL_REVIEWS: Review[] = [
  {
    title: "A solid guide for parents of children in competitive sports.",
    quote:
      "This is thoughtful guidance for anyone whose kids are in competitive sports. It gets across the idea that the relationship between parent and child is bigger than the sport. It teaches when it is appropriate to push and when to back off and let things unfold. It shows how to support young athletes with high standards while still making sure they know their worth is not tied to their performance.",
    name: "Tony Christensen",
  },
  {
    title: "Thoughtful, inspiring and truly an excellent read",
    quote:
      "The authenticity and real-life experiences are so relatable and had me reflecting on times I did not always say the right things. Every chapter is thoughtful and inspires reflection. An excellent resource for parents whose kids are just getting started in competitive team sports — and especially for those of us with older teens who have been at it for a while.",
    name: "Nicole Polifroni",
  },
  {
    title: "The resource you did not know your child needed you to read",
    quote:
      "This was written with the raw honesty so many parents need to hear. It offers practical principles and real ways to raise emotionally resilient children while preserving our relationship with them. Parts brought me to tears, and other parts gave me key words to say at the most critical times — and showed me when to sit in silence.",
    name: "Sports Parent",
  },
  {
    title: "A must for parents of athletes",
    quote:
      "A must for any parent of an athlete. Very encouraging and super helpful, with tips for communicating and developing a well-rounded athlete who loves to compete and have fun.",
    name: "Jordan David Fox",
  },
  {
    title: "A great read",
    quote:
      "Great perspective on being a positive part of your child's athletic and life development. I wish I had this years ago!",
    name: "Neil",
  },
  {
    title: "This should be a mandatory read for parents with kids in sports",
    quote:
      "A refreshing roadmap for navigating the high-pressure world of youth sports. Instead of focusing on short-term wins, it shows how to build resilient, grounded kids who will love the game. It is loaded with practical advice for handling the quiet car ride home, balancing the push for potential, and maintaining a healthy relationship with our kids.",
    name: "Jim Kean",
  },
  {
    title: "A parent and head coach's perspective",
    quote:
      "The emotional environment surrounding sports often shapes young athletes just as much as coaching, training, and competition. The message is not about lowering standards, but about creating an environment where kids can be challenged, held accountable, and still know their worth is not tied to their performance.",
    name: "Mike Hosein",
  },
  {
    quote:
      "What resonated most was the focus on confidence, burnout, failure, and the role parents play during both success and adversity. The insights on the car ride home, letting coaches coach, and maintaining emotional safety while still demanding effort are lessons every sports family can benefit from.",
    name: "Mike Hosein",
  },
  {
    title: "Raising an athlete",
    quote:
      "A thoughtful and refreshing perspective on youth sports, emphasizing long-term development over short-term success. It encourages parents and coaches to prioritize growth, resilience, mental strength, well-being, and a lifelong love of sport rather than immediate wins or early recognition.",
    name: "J. Mullen",
  },
  {
    title: "A must for parents with competitive athletes",
    quote:
      "The insights are practical and relatable, offering guidance that will undoubtedly change how I approach conversations with my kids. I feel better equipped to support them through challenges, especially when they struggle with performance and confidence, and to foster a healthier, more positive perspective on their athletic journey.",
    name: "David Charles",
  },
  {
    quote:
      "Such a great read. If you are a coach or a parent, do yourself a favour and read it. Without a doubt, it will help you.",
    name: "Greg Grover",
  },
  {
    title: "Sports perspectives from every angle",
    quote:
      "This captures the essence of how parents raise their kids in sports and all the nuances of competition, success, heartache, and so much more. As a father of three boys in sports and a coach, I highly recommend it.",
    name: "Sports Parent",
  },
  {
    title: "Great for any parent with a child in sports",
    quote:
      "A great resource for any parent, coach, or official involved in youth sports. The honesty and insight are very helpful and eye-opening.",
    name: "Mark Hutchison",
  },
  {
    title: "Buy it now",
    quote:
      "Every parent of an athlete needs this, even if it is “just for fun” at the beginning. I wish I had it years ago — it would have changed a lot of things in my relationship with my kids.",
    name: "Sports Parent",
  },
  {
    title: "Practical and informative",
    quote:
      "Exactly what every sports parent needs. Realistic, practical advice that actually makes sense — no fluff. Common-sense strategies to build confidence, keep kids loving the game, and avoid the common burnout traps. As a parent and coach navigating youth sports, this gave me clarity and peace of mind.",
    name: "Pierre Saucier",
  },
  {
    title: "A strong resource for youth athletes and their families",
    quote:
      "With all the pressures youth athletes and their parents face today, this gives families a strong guideline for encouraging progress at a high level while still maintaining the most important relationship of all — parent and child. The situations are relatable and the questions help both parent and child grow throughout the journey.",
    name: "Tricia Wilson",
  },
  {
    title: "Only one regret — I should have read it sooner",
    quote:
      "As both a parent and a coach, I found this to be one of the most practical and relatable resources I have read on raising and supporting young athletes. The stories and personal examples really hit home. It inspires me to be better and gives me actionable ideas for how to make it happen. My only regret is not having read it sooner.",
    name: "Angie Jimenez",
  },
  {
    title: "Must read for any parent with a young athlete",
    quote:
      "Fantastic for a sports parent. It provides a moment of self-reflection while keeping a very human side to it. If you have a young athlete, this is worth reading.",
    name: "B.K.B",
  },
  {
    title: "A must read",
    quote:
      "I wish I had this when my boys were growing up and playing competitive sports. It is a must-read for sports parents — and coaches too. The information helps ground you in what your role is as a parent.",
    name: "Sher Bear",
  },
  {
    title: "A must for parents of elite athletes",
    quote:
      "An insightful resource that gives parents tools to navigate the world of elite sports while continuing to strengthen the parent-child relationship. It encourages parents to ask themselves difficult questions and offers meaningful advice for guiding their young athletes.",
    name: "Sports Parent",
  },
  {
    title: "A must read for parents",
    quote:
      "I honestly wish I had this 10 years ago. It is an enlightening, humbling and honest look at what we go through as parents and the same scenarios we revisit when thinking about how things could have been handled differently. I will be sharing it with my teens so they can see the full picture and benefit from it in their future.",
    name: "Ian Howells",
  },
];
