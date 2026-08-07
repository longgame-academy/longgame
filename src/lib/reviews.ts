/**
 * The parent review library.
 *
 * Every review on the site comes from this file so the three placements cannot
 * drift apart or start repeating each other: the homepage shows
 * HOMEPAGE_REVIEWS, the Parent Academy page shows ACADEMY_REVIEWS, and /reviews
 * shows everything that is not already on one of those two pages.
 *
 * Copy rules that apply to anything added here:
 *  - No reviewer is quoted naming Shawn or Shawn Dixon. If a source does,
 *    recast the sentence lightly and keep the meaning.
 *  - Grammar and punctuation cleanup only. Never make a reviewer sound more
 *    enthusiastic or more certain than the original, and never join unrelated
 *    sentences together in a way that changes what they said.
 *  - Use the name as given. An anonymous source is "Sports Parent".
 *  - No dates, no review-format labels, no marketplace branding of any kind.
 */
export type Review = {
  quote: string;
  name: string;
};

/** The four reviews in "What Parents Are Saying" on the homepage. */
export const HOMEPAGE_REVIEWS: Review[] = [
  {
    quote:
      "This helped me rethink the way I support my son after difficult games. I feel more confident knowing when to talk, when to listen, and when to simply give him space.",
    name: "Sarah Mitchell",
  },
  {
    quote:
      "Practical, relatable, and immediately useful. I found myself changing the way I handled conversations with my daughter within the first week.",
    name: "Jason Reynolds",
  },
  {
    quote:
      "The car ride home section alone changed the way I communicate after games. Such a simple shift made a noticeable difference in our relationship.",
    name: "Rachel Bennett",
  },
  {
    quote:
      "I loved how practical it is. There are real examples and real words to use, not just general parenting advice.",
    name: "Stephanie Grant",
  },
];

/**
 * The two reviews in "From Parents" on the Parent Academy page. These are
 * deliberately different people from HOMEPAGE_REVIEWS — the two sections must
 * never show the same review.
 */
export const ACADEMY_REVIEWS: Review[] = [
  {
    quote:
      "The biggest takeaway for me was learning how easy it is to create pressure without realizing it. This gave me a much healthier way to support my child.",
    name: "Melissa Carter",
  },
  {
    quote:
      "This feels like advice from someone who understands both sides of youth sports — the desire to help kids succeed and the importance of protecting the relationship.",
    name: "Kevin Morris",
  },
];

/**
 * The rest of the library. /reviews renders these, so a review belongs here
 * only while it is not featured on the homepage or the Parent Academy page.
 */
export const MORE_REVIEWS: Review[] = [
  {
    quote:
      "This is the kind of guidance I wish I had when my kids first entered competitive sports. It is thoughtful without ever lowering expectations.",
    name: "David Thompson",
  },
  {
    quote:
      "I really appreciated the focus on confidence, resilience, and keeping sport in perspective. It feels grounded in what families actually deal with.",
    name: "Chris Walker",
  },
  {
    quote:
      "This gave me practical language for some of the hardest moments in youth sports. I no longer feel like I have to figure out every conversation on my own.",
    name: "Amanda Lewis",
  },
  {
    quote:
      "It strikes the right balance between encouraging kids to compete and making sure their identity is not tied to performance.",
    name: "Mark Sullivan",
  },
  {
    quote:
      "There were several moments where I recognized myself immediately. It made me reflect on what my daughter actually needs from me as a sports parent.",
    name: "Jennifer Clarke",
  },
  {
    quote:
      "Clear, honest, and useful. It helped me understand how to hold high standards without adding unnecessary pressure.",
    name: "Brian Foster",
  },
  {
    quote:
      "The confidence and burnout sections were especially helpful for our family. I came away with specific things I could do differently right away.",
    name: "Laura McKenzie",
  },
  {
    quote:
      "It helped me see that supporting my son does not mean solving everything for him. Sometimes the best thing I can do is create the right environment.",
    name: "Michael Turner",
  },
  {
    quote:
      "A thoughtful approach to raising athletes who are confident, resilient, and still love the game. I would recommend it to any sports parent.",
    name: "Natalie Brooks",
  },
];
